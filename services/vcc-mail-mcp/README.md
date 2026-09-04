# VCC Mail MCP Gateway

Isolated agent-facing mail service for the VCC mailbox. It connects directly to the same verified backend used by Roundcube and does not modify Roundcube.

## Endpoints

- IMAP: `mailserver.businessidentity.llc:993` implicit TLS
- SMTP: `mailserver.businessidentity.llc:465` implicit TLS

## Control posture

- Credentials are environment secrets only; never commit them.
- IMAP read/search is the first commissioning target.
- SMTP sending defaults to **HOLD** (`VCC_MAIL_SEND_ENABLED=false`).
- A send operation additionally requires explicit `authorization: "APPROVED"`.
- Send actions emit an audit event without logging the mailbox password or message body.

## Commissioning

1. Copy `.env.example` to a local secret environment; set the mailbox password outside Git.
2. `npm install`
3. `npm run check`
4. Perform a controlled IMAP read test.
5. Keep SMTP sending disabled until a separately authorized send test.
6. After successful commissioning, wrap these service functions as MCP tools for VCC Command Agent consumption.

Roundcube remains the human webmail client and is not changed by this service.
