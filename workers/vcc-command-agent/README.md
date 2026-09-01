# VCC Command Agent Worker

Isolated Cloudflare Worker boundary for VILIGANS COMMAND CORPORATION command-agent integrations.

## Security posture

- Authentication establishes identity/access only; it never grants corporate authority.
- Financial commitments, contracts, passenger operations, and public operational-readiness claims are hard HOLD classes.
- Nonbinding external communications require a verified CEO authorization record containing the seal status, exact action, scope, and APPROVED/PROCEED directive.
- Decisions are written to the `VCC_AUDIT` KV binding when configured.
- Secrets must be configured as Cloudflare Worker secrets and never committed.

## Local checks

```sh
npm install
npm test
npm run typecheck
npm run dev
```

## Required secret names

Configure only in the Worker environment as needed:

- `OPENAI_API_KEY`
- `MCP_CLIENT_ID`
- `MCP_CLIENT_SECRET`

Do not put secret values in `wrangler.jsonc` or repository files.

## MCP/OAuth integration

The authorization gate in this package must remain above all MCP tool execution. The next integration layer should use the Cloudflare Agents MCP client/OAuth facilities and call this policy gate before dispatching any side-effecting MCP tool.

Deployment remains separate from source approval. Replace the KV placeholder and configure secrets before deployment.
