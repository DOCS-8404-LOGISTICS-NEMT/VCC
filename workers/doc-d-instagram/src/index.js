const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function bearerToken(request) {
  const value = request.headers.get("authorization") || "";
  return value.startsWith("Bearer ") ? value.slice(7) : "";
}

function constantTimeEqual(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  let result = 0;
  for (let i = 0; i < left.length; i += 1) {
    result |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return result === 0;
}

function allowedHosts(env) {
  return new Set(
    (env.ALLOWED_MEDIA_HOSTS || "viliganscommandcorp.com,www.viliganscommandcorp.com")
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean),
  );
}

function validatePayload(payload, env) {
  if (!payload || typeof payload !== "object") return "JSON body is required";
  if (payload.approval_status !== "APPROVED") return "approval_status must be APPROVED";
  if (!/^[A-Za-z0-9][A-Za-z0-9._:-]{5,127}$/.test(payload.approval_id || "")) {
    return "approval_id is invalid";
  }
  if (typeof payload.caption !== "string" || payload.caption.length < 1 || payload.caption.length > 2200) {
    return "caption must contain 1 to 2200 characters";
  }
  let imageUrl;
  try {
    imageUrl = new URL(payload.image_url);
  } catch {
    return "image_url must be a valid URL";
  }
  if (imageUrl.protocol !== "https:") return "image_url must use HTTPS";
  if (!allowedHosts(env).has(imageUrl.hostname.toLowerCase())) return "image_url host is not allowlisted";
  return null;
}

async function metaRequest(url, init, fetchImpl) {
  const response = await fetchImpl(url, init);
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.error) {
    const error = new Error(data.error?.message || `Meta request failed with HTTP ${response.status}`);
    error.status = response.status;
    error.metaCode = data.error?.code;
    throw error;
  }
  return data;
}

async function publishToInstagram(payload, env, fetchImpl = fetch) {
  const graphVersion = env.META_GRAPH_API_VERSION || "v24.0";
  const baseUrl = `https://graph.facebook.com/${graphVersion}/${encodeURIComponent(env.INSTAGRAM_ACCOUNT_ID)}`;
  const container = await metaRequest(
    `${baseUrl}/media`,
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        image_url: payload.image_url,
        caption: payload.caption,
        access_token: env.META_ACCESS_TOKEN,
      }),
    },
    fetchImpl,
  );

  const publication = await metaRequest(
    `${baseUrl}/media_publish`,
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        creation_id: container.id,
        access_token: env.META_ACCESS_TOKEN,
      }),
    },
    fetchImpl,
  );

  return { container_id: container.id, media_id: publication.id };
}

export async function handleRequest(request, env, fetchImpl = fetch) {
  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname === "/health") {
    return json(200, { ok: true, service: "doc-d-instagram-publisher", publishing_enabled: false });
  }
  if (request.method !== "POST" || url.pathname !== "/v1/instagram/publish") {
    return json(404, { ok: false, error: "Not found" });
  }
  if (!env.PUBLISH_API_KEY || !constantTimeEqual(bearerToken(request), env.PUBLISH_API_KEY)) {
    return json(401, { ok: false, error: "Unauthorized" });
  }
  if (!env.META_ACCESS_TOKEN || !env.INSTAGRAM_ACCOUNT_ID || !env.PUBLISHED_APPROVALS) {
    return json(503, { ok: false, error: "Publishing connection is not configured" });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, error: "Body must be valid JSON" });
  }
  const validationError = validatePayload(payload, env);
  if (validationError) return json(400, { ok: false, error: validationError });

  const key = `approval:${payload.approval_id}`;
  const prior = await env.PUBLISHED_APPROVALS.get(key, "json");
  if (prior) return json(409, { ok: false, error: "Approval was already published", publication: prior });

  try {
    const publication = await publishToInstagram(payload, env, fetchImpl);
    const record = {
      approval_id: payload.approval_id,
      ...publication,
      published_at: new Date().toISOString(),
    };
    await env.PUBLISHED_APPROVALS.put(key, JSON.stringify(record));
    return json(201, { ok: true, publication: record });
  } catch (error) {
    return json(502, {
      ok: false,
      error: "Instagram publication failed",
      detail: error.message,
      meta_code: error.metaCode || null,
    });
  }
}

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  },
};
