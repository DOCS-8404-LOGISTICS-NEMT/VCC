# Google Workspace Admin Foundation Draft

Prepared for VILIGANS COMMAND CORPORATION

Draft date: August 1, 2026

Corporate admin identity: aldavis@viliganscommandcorp.com

Domain: viliganscommandcorp.com

Status: Draft for review. DNS, Admin Console, Workspace security, and HIPAA/BAA changes require authorized approval before execution.

## Executive Summary

VCC should use Google Workspace as the corporation-owned operating layer for email, corporate records, grant traffic, partner outreach, compliance evidence, and launch documentation. The admin identity should remain `aldavis@viliganscommandcorp.com`, with a separate break-glass admin account and no personal-account ownership for official records.

## Immediate Actions

| Rank | Action | Owner | Approval gate |
|---:|---|---|---|
| 1 | Confirm `aldavis@viliganscommandcorp.com` has super-admin access and recovery options. | CEO / Admin | No public change unless recovery or admin roles are changed. |
| 2 | Confirm `viliganscommandcorp.com` is verified in Google Admin. | Admin | DNS access required. |
| 3 | Confirm Gmail is active and MX points to Google. | Admin | MX changes can interrupt email. |
| 4 | Review SPF, DKIM, and DMARC before grant/sponsor outreach. | Admin / Compliance | DNS changes require approval. |
| 5 | Create operating groups and aliases. | Admin | Approval before external use. |
| 6 | Create Shared Drives for the corporate binder and launch package. | Admin / Operations | Sharing policies must be approved. |
| 7 | Review HIPAA/BAA path before PHI or rider medical data is stored. | Compliance / Counsel | Legal/compliance approval required. |

## DNS And Email Status

Observed public DNS on August 1, 2026:

| Control | Observed status | Required decision |
|---|---|---|
| Google verification | Present | Confirm Admin Console shows domain verified. |
| Gmail MX | Present: `SMTP.GOOGLE.com` priority `1` | Confirm Gmail is active and mailboxes receive mail. |
| SPF | Present but not Google-only: `v=spf1 a mx include:spf.postal.businessidentity.llc ~all` | Confirm whether BusinessIdentity sends mail; add Google authorization if Gmail sends outbound and current SPF does not pass. |
| DKIM | Common Google selectors not found | Generate/publish Google DKIM or document the active selector. |
| DMARC | Present with `p=quarantine` | Confirm reports are monitored and do not block legitimate mail. |
| Website DNS | Apex points to `66.223.49.89`; `www` points to `ghs.googlehosted.com` | Website DNS is separate from Workspace mail; do not change mail records during hosting changes. |

## Operating Groups

- `info@viliganscommandcorp.com`
- `grants@viliganscommandcorp.com`
- `legal@viliganscommandcorp.com`
- `compliance@viliganscommandcorp.com`
- `operations@viliganscommandcorp.com`
- `transportation@viliganscommandcorp.com`
- `partners@viliganscommandcorp.com`
- `billing@viliganscommandcorp.com`
- `dmarc@viliganscommandcorp.com`

## Shared Drives

1. Corporate Governance
2. Grants and Funding
3. Transportation Operations
4. Vehicles and Assets
5. Insurance and Compliance
6. Contracts and Legal
7. Marketing and Partnerships
8. Finance and Investor Readiness

## Compliance Requirements

- Enforce 2-step verification for all admins.
- Keep one break-glass admin account.
- Use Shared Drives for corporate ownership of records.
- Restrict external sharing for legal, finance, compliance, driver, veteran, and medical-adjacent records.
- Do not store PHI or sensitive rider medical details until the BAA, covered services, sharing controls, and privacy workflow are approved.
- Keep Codex/GitHub source free of secrets and private evidence.

## Business Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Personal ownership of corporate records | Loss of records, governance confusion, weak funder diligence | Move records to VCC Shared Drives. |
| Incomplete sender authentication | Grant, sponsor, and partner email may be rejected or spoofed | Confirm SPF, DKIM, and DMARC before outreach. |
| Uncontrolled PHI storage | Privacy, contract, and regulatory exposure | Use minimum-necessary data and BAA/security review before medical details. |
| DNS changes without staging | Email or website outage | Separate mail DNS from website hosting changes; use a change log. |
| Over-broad sharing | Exposure of legal, veteran, financial, or rider data | Use group-based access and least privilege. |

## Funding And Revenue Implications

Google Workspace should support:

- SAM.gov and Grants.gov account control through `grants@`.
- WYDOT, county, clinic, sponsor, and VSO communications through role-based groups.
- Source-proof folders for grants, contracts, board approvals, and compliance evidence.
- Partner outreach tracking and signed-document retention.
- Funder diligence that shows VCC controls its domain, records, and communications.

## Next Steps

1. Confirm Workspace super-admin access.
2. Verify DNS from the registrar or DNS host.
3. Generate DKIM in Google Admin and publish the selector record.
4. Confirm SPF covers every approved sender and does not duplicate SPF records.
5. Confirm DMARC reports are accessible to VCC.
6. Create role groups and Shared Drives.
7. Move corporate records from individual folders into Shared Drives.
8. Record each completed control in `11_Evidence_Register.csv`.

## Official Sources

- Google Workspace TXT verification: https://knowledge.workspace.google.com/admin/domains/verify-your-domain-with-a-txt-record
- Google Workspace MX records: https://knowledge.workspace.google.com/admin/domains/set-up-mx-records-for-google-workspace
- Google Workspace SPF: https://knowledge.workspace.google.com/admin/security/set-up-spf
- Google Workspace DMARC: https://knowledge.workspace.google.com/admin/security/set-up-dmarc
- Google Workspace HIPAA implementation guide: https://cloud.google.com/security/compliance/workspace_cloud_identity_hipaa_implementation_guide_workspace_whitepaper
