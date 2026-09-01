import assert from "node:assert/strict";
import test from "node:test";
import { handleRequest } from "../src/index.js";

function env(overrides = {}) {
  const records = new Map();
  return {
    PUBLISH_API_KEY: "test-publish-key",
    META_ACCESS_TOKEN: "test-meta-token",
    INSTAGRAM_ACCOUNT_ID: "17841400000000000",
    META_GRAPH_API_VERSION: "v24.0",
    ALLOWED_MEDIA_HOSTS: "viliganscommandcorp.com",
    PUBLISHED_APPROVALS: {
      get: async (key) => records.get(key) || null,
      put: async (key, value) => records.set(key, JSON.parse(value)),
    },
    ...overrides,
  };
}

function publishRequest(body, token = "test-publish-key") {
  return new Request("https://publisher.example/v1/instagram/publish", {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const approvedPost = {
  approval_id: "DOC-D-2026-08-31-001",
  approval_status: "APPROVED",
  image_url: "https://viliganscommandcorp.com/social/approved/field-note.jpg",
  caption: "Approved DOC D field note.",
};

test("health endpoint does not claim publishing is enabled", async () => {
  const response = await handleRequest(new Request("https://publisher.example/health"), env());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).publishing_enabled, false);
});

test("rejects an invalid bearer token", async () => {
  const response = await handleRequest(publishRequest(approvedPost, "wrong"), env());
  assert.equal(response.status, 401);
});

test("rejects unapproved content", async () => {
  const response = await handleRequest(
    publishRequest({ ...approvedPost, approval_status: "DRAFT" }),
    env(),
  );
  assert.equal(response.status, 400);
});

test("rejects media outside the VCC allowlist", async () => {
  const response = await handleRequest(
    publishRequest({ ...approvedPost, image_url: "https://example.com/image.jpg" }),
    env(),
  );
  assert.equal(response.status, 400);
});

test("creates and publishes a media container once", async () => {
  const calls = [];
  const fakeFetch = async (url, init) => {
    calls.push({ url, body: String(init.body) });
    return new Response(JSON.stringify({ id: calls.length === 1 ? "container-1" : "media-1" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  const bindings = env();
  const first = await handleRequest(publishRequest(approvedPost), bindings, fakeFetch);
  assert.equal(first.status, 201);
  assert.equal(calls.length, 2);
  assert.match(calls[0].url, /\/media$/);
  assert.match(calls[1].url, /\/media_publish$/);

  const duplicate = await handleRequest(publishRequest(approvedPost), bindings, fakeFetch);
  assert.equal(duplicate.status, 409);
  assert.equal(calls.length, 2);
});
