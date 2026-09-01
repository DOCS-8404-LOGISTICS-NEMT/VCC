import { authorize, type AuthorizationRequest } from "./authorization";
import { makeAuditEvent, writeAuditEvent } from "./audit";

export interface Env {
  VCC_AUDIT?: KVNamespace;
  OPENAI_API_KEY?: string;
  MCP_CLIENT_ID?: string;
  MCP_CLIENT_SECRET?: string;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return json({ ok: true, service: "vcc-command-agent", posture: "HOLD_RESTRICTED_CLASSES" });
    }

    if (url.pathname !== "/authorize" || request.method !== "POST") {
      return json({ error: "not_found" }, 404);
    }

    const requestId = crypto.randomUUID();
    let input: AuthorizationRequest;
    try {
      input = await request.json<AuthorizationRequest>();
    } catch {
      return json({ error: "invalid_json", requestId }, 400);
    }

    const result = authorize(input);
    await writeAuditEvent(env, makeAuditEvent({
      requestId,
      actor: "authenticated-mcp-client",
      action: input.action,
      decision: result.allowed ? "ALLOW" : "DENY",
      reason: result.reason,
    }));

    return json({ requestId, ...result }, result.allowed ? 200 : 403);
  },
} satisfies ExportedHandler<Env>;
