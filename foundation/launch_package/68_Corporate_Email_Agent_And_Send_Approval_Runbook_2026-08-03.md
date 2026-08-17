# Corporate Email Agent And Send Approval Runbook

Prepared: August 3, 2026

Company: VILIGANS COMMAND CORPORATION

Operating path: DOCS 8404 Logistics & NEMT LLC

Pilot: Wheatland / Platte County, Wyoming

Corporate email identity: aldavis@viliganscommandcorp.com

Workspace agent: VCC Corporate Email Approval Agent

Workspace agent ID: agt_6a7180534f288191a6ad29c6504008cf

Status: Draft agent created; publish prompt prepared. This file does not authorize sending, draft creation, draft replacement, draft deletion, external contact, applications, credit pulls, deposits, reservations, rentals, leases, purchases, filings, insurance binding, invoices, restricted-fund acceptance, sponsor recognition, public launch claims, rider data exchange, or paid passenger service.

## Executive Purpose

The August funding and pilot-vehicle targets now depend on converting prepared packets and contact queues into written proof or dated call notes. The corporate email agent is the controlled operator for that workflow.

The agent may prepare, review, and route official VCC email work. It may use Gmail only under explicit approval for the exact action.

## Agent Configuration

| Control | Current Setting |
|---|---|
| Agent name | VCC Corporate Email Approval Agent |
| Agent status | Draft, not published until approved |
| Gmail connection | aldavis@viliganscommandcorp.com |
| Gmail actions | Enabled with end-user approval required for write actions |
| Web search | Enabled with Wheatland, Wyoming context |
| Persistent memory | Off |
| Active launch language | Accessible passenger vehicle, ADA/specialty mobility vehicle, approved partner vehicle, rental bridge, partner vehicle |

## What The Agent May Do After Publication

1. Search, read, and summarize VCC Gmail messages when asked.
2. Review existing launch, authority, vehicle, funding, partner, and sponsor drafts.
3. Identify drafts that are safe to approve, stale, missing proof, or blocked.
4. Prepare no-obligation email bodies for review.
5. Create Gmail drafts only after exact draft-creation approval.
6. Send Gmail drafts only after exact final send approval for the draft as currently stored.
7. Summarize sent status, waiting status, responses, and follow-up dates.
8. Prepare response summaries for logging into the launch-package evidence files.

## What The Agent May Not Do Without Separate Approval

- Send any email.
- Create, update, delete, or replace any Gmail draft.
- Forward, archive, trash, label, or move Gmail messages.
- Submit a public form or application.
- Request or accept payment.
- Issue invoices.
- Promise sponsor recognition.
- Authorize a credit pull.
- Apply for debt, grants, insurance, authority, or vendor financing.
- Pay fees, deposits, reservations, rentals, leases, purchases, or binders.
- Sign or approve an MOU, service agreement, quote, loan, rental, lease, purchase, or insurance bind.
- File operating-authority paperwork or represent that authority is active.
- Claim VCC has active vehicle capacity, insurance, Medicaid enrollment, public launch, or paid passenger service unless written proof exists.
- Request, store, or forward rider names, medical details, Medicaid identifiers, VA records, diagnoses, treatment trip purposes, or other PHI.

## Exact Approval Text: Publish Agent

Use this only if the draft agent is ready to go live:

```text
I approve publishing the VCC Corporate Email Approval Agent, agent ID agt_6a7180534f288191a6ad29c6504008cf, with Gmail connected to aldavis@viliganscommandcorp.com and Gmail write actions requiring end-user approval.
```

## Exact Approval Text: Send Existing Draft

Use this only after reviewing the exact Gmail draft:

```text
I approve sending Gmail draft [DRAFT ID] to [RECIPIENT] with subject "[SUBJECT]" exactly as currently stored.

This approval is send-only for that exact draft. It does not authorize other sends, draft edits, applications, credit pulls, deposits, reservations, rentals, leases, purchases, filings, insurance binding, invoices, restricted-fund acceptance, sponsor recognition, public launch claims, rider data exchange, or paid passenger service.
```

## Exact Approval Text: Create Replacement Draft

Use this when an older draft has a stale attachment or outdated body:

```text
I approve creating a replacement Gmail draft for [RECIPIENT] with subject "[SUBJECT]" using the body and attachment listed in the approved manifest.

This approval is draft creation only. It does not authorize sending the draft or taking any financial, legal, regulatory, insurance, vehicle, public-claim, data-sharing, or service-launch action.
```

## Exact Approval Text: Send Replacement Draft

Use this after the replacement draft exists and its new draft ID is known:

```text
I approve sending replacement Gmail draft [NEW DRAFT ID] to [RECIPIENT] with subject "[SUBJECT]" exactly as currently stored.

This approval is send-only for that exact replacement draft. It does not authorize other sends, draft edits, applications, credit pulls, deposits, reservations, rentals, leases, purchases, filings, insurance binding, invoices, restricted-fund acceptance, sponsor recognition, public launch claims, rider data exchange, or paid passenger service.
```

## First Agent Work Order After Publication

1. Review `33_Gmail_Recipient_Draft_Register_2026-08-02.csv`, `35_Vehicle_Insurance_Financing_Draft_Register_2026-08-02.csv`, `43_Gmail_Vehicle_Funding_Close_Draft_Register_2026-08-02.csv`, `45_Gmail_Authority_Draft_Register_2026-08-02.csv`, and `53_Gmail_Draft_Attachment_Refresh_Audit_2026-08-02.md`.
2. Use `69_Corporate_Email_Agent_Send_Batch_Register_2026-08-03.csv` as the current send/readiness board.
3. Separate existing drafts that can be reviewed for send approval from stale drafts that require replacement.
4. Prepare a single approval checklist for the next proof-producing batch.
5. After approved sends or responses, update first-capture notes for reconciliation into the evidence log, quote scorecard, and proof clock.

## Recommended Additional Agents

| Priority | Recommended Agent | Purpose | Connector / Tool Need | Approval Boundary |
|---:|---|---|---|---|
| 1 | VCC Evidence And Proof Clock Agent | Maintain response intake, evidence log, quote scorecard, and proof-clock status after every call, email, or form response. | Google Drive or repo access, spreadsheet tools, Gmail read context. | Cannot count proof unless written response or dated call notes satisfy the required fields. |
| 2 | VCC Authority And Insurance Agent | Track WYDOT, FMCSA, commercial passenger/NEMT insurance, Form E, driver, and vehicle requirements. | Web search, Gmail, Google Drive. | Cannot file, pay, bind, certify, or represent authority/insurance without exact approval. |
| 3 | VCC Vehicle Control Agent | Compare accessible rental bridge, lease, purchase, and approved partner-vehicle paths against August 15 timing. | Web search, Gmail, Google Drive, spreadsheet tools. | Cannot reserve, rent, lease, purchase, pay, or claim vehicle control without exact approval. |
| 4 | VCC Funding Close Agent | Manage sponsor/readiness, local partner, bridge, microloan, and cash-trigger workflows. | Gmail, Google Drive, spreadsheet tools, optional accounting data. | Cannot invoice, accept restricted funds, apply for debt/grants, authorize credit pulls, or promise recognition without exact approval. |
| 5 | VCC Website And Trust Agent | Finish public website routing, SSL, DKIM/SPF/DMARC evidence, analytics, and public-contact readiness. | GitHub, web search, Google Workspace/Drive context. | Cannot change DNS, publish public claims, or change admin settings without approval. |

## Immediate Recommendation

Publish the corporate email agent first, then use it only to review existing drafts and produce the next exact approval checklist. Do not send the whole queue at once. Start with authority, insurance, rental bridge, partner-vehicle proof, then sponsor/readiness funding once vehicle and compliance facts are grounded.
