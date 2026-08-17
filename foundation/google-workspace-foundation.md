# Google Workspace Foundation

Prepared: August 1, 2026

Company: VILIGANS COMMAND CORPORATION

Corporate admin identity: aldavis@viliganscommandcorp.com

Domain: viliganscommandcorp.com

## Purpose

This file makes Google Workspace part of the VCC operating foundation. It connects the corporate email identity, domain records, Drive structure, security controls, and project tooling used by Codex, GitHub, Amplitude, and the VCC launch package.

This is not a credential file. Do not store passwords, recovery codes, private keys, OAuth secrets, API keys, bank information, SSNs, VA records, or medical/rider records in this repository.

## Current DNS Snapshot

Observed from public DNS lookup on August 1, 2026:

| Record | Current value | Status |
|---|---|---|
| Apex A | `66.223.49.89` | Website host record; not GitHub Pages. |
| `www` CNAME | `ghs.googlehosted.com` | Google-hosted website path. |
| MX | `1 SMTP.GOOGLE.com` | Google Workspace mail delivery appears active at DNS level. |
| TXT verification | `google-site-verification=...` | Google domain verification exists. |
| TXT verification | `openai-domain-verification=...` | OpenAI domain verification exists. |
| TXT verification | `zoho-verification=...` | Legacy or third-party verification; review before removing. |
| SPF TXT | `v=spf1 a mx include:spf.postal.businessidentity.llc ~all` | Needs review before grant/sponsor outreach. |
| DMARC TXT | `v=DMARC1; p=quarantine; ...` | Active; reports route to a BusinessIdentity mailbox. |
| DKIM TXT | Common selectors not found: `google`, `default`, `selector1` | Generate and publish Google DKIM if not already using another selector. |

## Admin Identity

Use `aldavis@viliganscommandcorp.com` as the operating corporate admin/officer identity for:

- Google Workspace administration
- Google Drive corporate records
- GitHub organization or repository ownership context
- Amplitude analytics ownership context
- public website contact metadata
- grant, sponsor, partner, insurance, and compliance communications

Create one separate break-glass super-admin account. Keep it unused for daily work, secured by phishing-resistant 2-step verification where available, and store recovery information outside this repository.

## Setup Order

1. Confirm `aldavis@viliganscommandcorp.com` has Google Workspace super-admin access.
2. Confirm `viliganscommandcorp.com` is verified in Google Admin.
3. Confirm Gmail is active and MX points to `smtp.google.com`.
4. Review SPF so Google Workspace and any approved third-party sender are authorized.
5. Generate and publish Google DKIM in Google Admin, then start authentication.
6. Confirm DMARC reporting is monitored and aligned to a corporate mailbox or approved vendor.
7. Create operating groups and aliases.
8. Create Shared Drives for source-proof corporate records.
9. Accept or verify the Google Workspace HIPAA/BAA path before storing PHI or rider medical details.
10. Connect Workspace records back to this repo through the evidence register.

## DNS Records To Control

| Purpose | Host | Type | Target value / action |
|---|---|---|---|
| Domain verification | `@` | TXT | Use the exact `google-site-verification=` value from Google Admin. |
| Gmail inbound mail | `@` | MX | `smtp.google.com` with priority `1`. |
| SPF | `@` | TXT | Use a single SPF record that includes Google and any approved sender. Example if only Google sends mail: `v=spf1 include:_spf.google.com ~all`. |
| DKIM | `[selector]._domainkey` | TXT | Generate in Google Admin under Gmail authentication; publish the exact record. |
| DMARC | `_dmarc` | TXT | Keep a monitored policy. Current DNS has `p=quarantine`; do not harden to `reject` until all senders pass SPF/DKIM. |
| Website apex | `@` | A | Website host record; do not change while Google-hosted site is intended. |
| Website www | `www` | CNAME | Website host record; currently Google-hosted. |

Do not delete legacy TXT records until the service owner confirms they are no longer needed. Remove or change MX/SPF/DKIM/DMARC only during a controlled email-change window.

## Operating Groups

Recommended groups or aliases:

| Address | Use |
|---|---|
| `info@viliganscommandcorp.com` | Public inquiries and website contact. |
| `grants@viliganscommandcorp.com` | SAM.gov, Grants.gov, WYDOT, foundation, and federal/state funding traffic. |
| `legal@viliganscommandcorp.com` | Governance, contracts, notices, filings, and legal review. |
| `compliance@viliganscommandcorp.com` | WYDOT, insurance, Medicaid readiness, privacy, safety, and incident controls. |
| `operations@viliganscommandcorp.com` | Dispatch planning, vehicle readiness, staffing, and launch execution. |
| `transportation@viliganscommandcorp.com` | Partner-facing transportation and mobility communications. |
| `partners@viliganscommandcorp.com` | Clinics, counties, senior centers, disability organizations, VSOs, sponsors, and employers. |
| `billing@viliganscommandcorp.com` | Invoices, service agreements, sponsor payments, and future claim workflow. |
| `dmarc@viliganscommandcorp.com` | DMARC reporting if not routed to an approved vendor mailbox. |

## Shared Drive Structure

Use Shared Drives so records belong to VCC rather than a personal account.

| Shared Drive | Contents |
|---|---|
| Corporate Governance | Articles, good standing, bylaws, consents, stock ledger, cap table, annual reports. |
| Grants and Funding | SAM, Grants.gov, grant calendar, NOFOs, budgets, narratives, submissions, awards. |
| Transportation Operations | operating authority, driver files, training, dispatch, trip logs, route plans. |
| Vehicles and Assets | titles, inspections, maintenance, insurance, equipment, asset ledger. |
| Insurance and Compliance | policies, COIs, claims, incident reports, privacy, HIPAA/BAA evidence, Medicaid readiness. |
| Contracts and Legal | MOUs, service agreements, vendor agreements, sponsorship agreements, notices. |
| Marketing and Partnerships | capability statements, flyers, outreach lists, support letters, sponsor assets. |
| Finance and Investor Readiness | budgets, forecasts, bank/lender packets, board approvals, funding sources. |

## PHI And HIPAA Guardrail

Because VCC is preparing NEMT and special-needs transportation operations, do not store rider medical information, Medicaid identifiers, trip-purpose medical details, disability records, VA evidence, or protected health information in general Workspace folders until:

- the correct Google Workspace edition and covered services are confirmed,
- the Google Workspace BAA is reviewed and accepted by an authorized admin if VCC is acting as a covered entity or business associate,
- sharing restrictions, 2-step verification, audit logs, retention, and data-loss controls are configured,
- minimum-necessary intake and trip-record procedures are approved.

## Project Integration

| System | Integration rule |
|---|---|
| Codex | Maintain source files and operating documents using the VCC corporate identity. |
| GitHub | Store approved source of truth; do not commit secrets or raw sensitive records. |
| Google Drive | Store corporate binders, source-proof records, and external-ready drafts in Shared Drives. |
| Amplitude | Track website/product behavior with VCC metadata, not private rider data. |
| Website | Use `viliganscommandcorp.com` as the public domain once hosting/DNS is stable. |

## Official References

- Google Workspace domain verification: https://knowledge.workspace.google.com/admin/domains/verify-your-domain-with-a-txt-record
- Google Workspace MX setup: https://knowledge.workspace.google.com/admin/domains/set-up-mx-records-for-google-workspace
- Google Workspace SPF setup: https://knowledge.workspace.google.com/admin/security/set-up-spf
- Google Workspace DMARC setup: https://knowledge.workspace.google.com/admin/security/set-up-dmarc
- Google Workspace and Cloud Identity HIPAA implementation guide: https://cloud.google.com/security/compliance/workspace_cloud_identity_hipaa_implementation_guide_workspace_whitepaper
