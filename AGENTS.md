# Codex Instructions for VCC Repository

## Repository identity

This repository belongs to VILIGANS COMMAND CORPORATION (VCC) and supports DOCS NREMT & Logistics, a Wyoming-focused non-emergency medical transportation (NEMT), logistics, and rural health access initiative.

Do not treat this repository as a generic GitHub demo. All changes should preserve the VCC / DOCS NREMT & Logistics business context.

## Corporate identity

Use `aldavis@viliganscommandcorp.com` as the VCC corporate email identity for business-context metadata, contact references, analytics ownership context, and platform setup guidance.

Do not treat this email as a secret. It is a corporate contact identity. Do not hard-code passwords, tokens, private keys, API secrets, or personal credentials.

## Primary goal

Keep Codex, GitHub, and Amplitude working together as one system:

1. Codex maintains the repository and proposes safe code changes.
2. GitHub stores the source of truth and runs workflows.
3. Amplitude tracks client-side product, website, and funnel behavior.

## Google Workspace rules

- Treat `viliganscommandcorp.com` as the VCC corporate Google Workspace domain.
- Treat `aldavis@viliganscommandcorp.com` as the operating corporate admin/officer identity for setup guidance, Drive ownership context, public contact metadata, and grant/partner readiness.
- Do not store Google passwords, recovery codes, OAuth secrets, API keys, DKIM private material, bank data, SSNs, VA records, rider medical records, or PHI in this repository.
- Prefer Google Shared Drives for corporate binders and launch records so files are owned by VCC rather than a personal account.
- Before storing rider medical, Medicaid, disability, or trip-purpose health information in Workspace, require HIPAA/BAA and sharing-control review.
- Keep Workspace setup evidence in `foundation/google-workspace-foundation.md`, `foundation/launch_package/16_Google_Workspace_Admin_Foundation_DRAFT.md`, and `foundation/launch_package/11_Evidence_Register.csv`.

## Amplitude rules

- Use the lowercase npm package name: `@amplitude/unified`.
- Initialize Amplitude only once per browser lifecycle.
- Amplitude code must run client-side only.
- Never initialize Amplitude in server-side code.
- Keep Session Replay enabled only from client-side browser code.
- Include VCC business identity metadata in analytics events where appropriate, including company, division, website, and corporate email.
- When adding analytics events, prefer business-relevant names tied to VCC operations, funding, contact, and service-readiness flows.

Recommended initialization shape:

```js
amplitude.initAll(AMPLITUDE_API_KEY, {
  analytics: { autocapture: true },
  sessionReplay: { sampleRate: 1 }
});
```

## Suggested event naming

Use clear, stable event names such as:

- `VCC Page Viewed`
- `VCC CTA Clicked`
- `VCC Contact Intent`
- `VCC Funding Interest`
- `VCC Service Area Interest`
- `VCC Capability Statement Interest`

## Git rules

- Do not commit `node_modules/`.
- Keep `package-lock.json` committed when npm dependencies change.
- Keep workflows in `.github/workflows/`.
- Keep custom GitHub Action metadata in `action.yml` or `action.yaml` only if this repository becomes a custom action.

## Current repository notes

- The repo is private during VCC infrastructure development.
- Private visibility should not block browser-side Amplitude tracking in a deployed page.
- Codex and GitHub integrations must have explicit access to this repository through the installed GitHub app or selected repository access.
- The public company website is `https://viliganscommandcorp.com`.
- The corporate email identity is `aldavis@viliganscommandcorp.com`.

## Business context to preserve

- Wyoming-based NEMT and logistics operations
- Rural health transportation access
- Veteran-founded business infrastructure
- Automation, analytics, compliance, and operational readiness
