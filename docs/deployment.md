# VCC Website Source and Deployment Control

## Authoritative architecture

- Active pre-launch evidence-gathering site: https://www.viliganscommandcorp.com
- Reserved future Doc D AI domain: https://viliganscommandcorp.com
- Current public-facing entity: VILIGANS COMMAND CORPORATION
- Corporate email: aldavis@viliganscommandcorp.com

The live `www` site may be ChatGPT-hosted. GitHub Pages is not presumed or required as the production host. The apex is reserved for a future Doc D AI deployment after grant funding and final pilot authorization and is outside current launch scope.

## Repository role

This repository stores planning-stage source and validates that the Vite project builds. It is not treated as the live deployment source until provider-native source/version evidence and independent destination readback establish that relationship.

`.github/workflows/proof-html.yml` runs build validation. `.github/workflows/deploy-pages.yml` is retained as a disabled legacy control and does not deploy.

## Deployment authority

No push, build, workflow, document, or technical result independently authorizes:

- a production deployment;
- DNS or custom-domain changes;
- repointing `www` or the apex;
- public-claim changes;
- public-intake changes or response processing; or
- passenger operations.

Any future production mutation requires exact authenticated authority, a defined target, pre-action readback, provider-native version evidence, a rollback point, and post-action destination verification.

## Analytics variables

The build may read:

- `VITE_AMPLITUDE_API_KEY`
- `VITE_AMPLITUDE_SESSION_REPLAY_SAMPLE_RATE`

A successful build with those variables does not prove production instrumentation or event receipt. Verify analytics independently and do not expose credentials.

## Historical material

Earlier GitHub Pages and DNS instructions are superseded for current deployment decisions. Historical records may be retained as provenance but must not be executed as current instructions.
