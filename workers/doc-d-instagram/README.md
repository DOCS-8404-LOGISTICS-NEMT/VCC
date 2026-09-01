# DOC D Instagram Publisher

Status: code implemented; external publishing remains HOLD until Cloudflare and Meta configuration are verified.

This isolated Cloudflare Worker publishes only already-approved DOC D image posts. It does not generate, revise, schedule, or independently approve content.

## Controls

- Bearer authentication is required for every publish request.
- `approval_status` must equal `APPROVED`.
- `approval_id` is required and stored in KV after successful publication.
- Reuse of an approval ID returns HTTP 409 and does not call Meta again.
- Media must use HTTPS and an allowlisted VCC-controlled hostname.
- Meta credentials remain Cloudflare secrets and never enter the Vite browser bundle or GitHub.
- The health endpoint deliberately reports `publishing_enabled: false`; health is not proof that Meta is connected.

## One-time setup

1. Confirm the DOC D Instagram account is a Meta-supported professional account and obtain the required content-publishing permission.
2. Create production and preview KV namespaces. Replace the placeholder IDs in `wrangler.jsonc`.
3. Configure the required secrets:

   ```bash
   npx wrangler secret put PUBLISH_API_KEY
   npx wrangler secret put META_ACCESS_TOKEN
   npx wrangler secret put INSTAGRAM_ACCOUNT_ID
   ```

4. Make the approved image available at a public HTTPS URL on an allowlisted VCC host.
5. Run `npm test`, deploy with `npm run deploy`, and perform a separately approved test publication.

Never put real values in `.dev.vars`, `.env`, `wrangler.jsonc`, source code, test fixtures, issues, logs, or documentation committed to GitHub.

## Request

```http
POST /v1/instagram/publish
Authorization: Bearer <PUBLISH_API_KEY>
Content-Type: application/json

{
  "approval_id": "DOC-D-2026-08-31-001",
  "approval_status": "APPROVED",
  "image_url": "https://viliganscommandcorp.com/social/approved/doc-d-2026-08-31-001.jpg",
  "caption": "Approved caption and hashtags"
}
```

Success returns HTTP 201 with the Meta container ID, Instagram media ID, approval ID, and timestamp. Meta errors return HTTP 502 without marking the approval as published.

## Explicit HOLD points

- Do not deploy until the KV IDs are replaced.
- Do not publish until the Meta token and Instagram account ID are verified.
- Do not publish a draft, revised, or substituted asset under an existing approval ID.
- Do not treat a successful deployment or health response as proof of an authenticated Meta connection.
