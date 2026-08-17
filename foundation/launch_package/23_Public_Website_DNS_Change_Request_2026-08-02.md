# Public Website DNS Change Request

VILIGANS COMMAND CORPORATION

Prepared: August 2, 2026

Status: Ready for DNS administrator action. Do not change mail records.

## Executive Summary

GitHub Pages has been enabled for `DOCS-8404-LOGISTICS-NEMT/demo-repository`, the source is set to GitHub Actions, the custom domain is saved as `viliganscommandcorp.com`, and the deployment workflow completed successfully.

The VCC website still fails publicly because the authoritative DNS zone is still routing website traffic to the prior host.

## Current DNS Authority

Authoritative nameservers:

- `NS1.HOSTING.BUSINESSIDENTITY.LLC`
- `NS2.HOSTING.BUSINESSIDENTITY.LLC`

Current website records observed:

| Host | Type | Current value | Problem |
|---|---|---|---|
| `viliganscommandcorp.com` | `A` | `66.223.49.89` | Not a GitHub Pages apex record. |
| `www.viliganscommandcorp.com` | `CNAME` | `ghs.googlehosted.com` | Points to the old Google-hosted website path. |

Current mail records observed:

| Host | Type | Current value | Action |
|---|---|---|---|
| `viliganscommandcorp.com` | `MX` | `SMTP.GOOGLE.com`, priority `1` | Keep. |
| `viliganscommandcorp.com` | `TXT` | Google verification, OpenAI verification, SPF, Zoho verification | Keep unless separately reviewed. |
| `_dmarc.viliganscommandcorp.com` | `TXT` | DMARC quarantine record | Keep unless separately reviewed. |

## Required DNS Edits

In the BusinessIdentity DNS panel, update only website routing records:

### Apex Domain

Delete or replace the existing apex `A` record:

| Host | Type | Old value |
|---|---|---|
| `@` | `A` | `66.223.49.89` |

Add these four GitHub Pages apex `A` records:

| Host | Type | Value |
|---|---|---|
| `@` | `A` | `185.199.108.153` |
| `@` | `A` | `185.199.109.153` |
| `@` | `A` | `185.199.110.153` |
| `@` | `A` | `185.199.111.153` |

Optional IPv6 records:

| Host | Type | Value |
|---|---|---|
| `@` | `AAAA` | `2606:50c0:8000::153` |
| `@` | `AAAA` | `2606:50c0:8001::153` |
| `@` | `AAAA` | `2606:50c0:8002::153` |
| `@` | `AAAA` | `2606:50c0:8003::153` |

### WWW Host

Delete or replace:

| Host | Type | Old value |
|---|---|---|
| `www` | `CNAME` | `ghs.googlehosted.com` |

Add:

| Host | Type | Value |
|---|---|---|
| `www` | `CNAME` | `DOCS-8404-LOGISTICS-NEMT.github.io` |

## Do Not Change

Do not delete or modify these records during the website cutover:

- MX records for Google Workspace.
- Google verification TXT.
- OpenAI verification TXT.
- SPF TXT.
- DMARC TXT.
- DKIM records if Google Admin later provides one.
- Any unrelated app, mail, or ownership-verification records.

## Post-Change Verification

After DNS is saved:

1. Wait for DNS propagation.
2. Confirm `viliganscommandcorp.com` resolves to the four GitHub Pages `A` records.
3. Confirm `www.viliganscommandcorp.com` resolves to `DOCS-8404-LOGISTICS-NEMT.github.io`.
4. Refresh GitHub Pages DNS health.
5. Wait for GitHub Pages HTTPS certificate state to become valid.
6. Enable Enforce HTTPS in GitHub Pages if it is not automatically enabled.
7. Confirm these URLs load the VCC site:
   - `https://viliganscommandcorp.com`
   - `https://www.viliganscommandcorp.com`

## GitHub Pages State

- Repository: `DOCS-8404-LOGISTICS-NEMT/demo-repository`
- Publishing source: GitHub Actions
- Custom domain: `viliganscommandcorp.com`
- Latest successful deployment workflow: Deploy Website, run `30748955507`, August 2, 2026
- Verified by forced local resolution: GitHub Pages serves the VCC site when `viliganscommandcorp.com` is resolved to a GitHub Pages IP.

## Approval Gate

DNS changes are infrastructure changes. The CEO/domain administrator must approve or perform the BusinessIdentity DNS edit.
