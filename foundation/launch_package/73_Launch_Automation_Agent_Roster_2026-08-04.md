# Launch Automation Agent Roster

Prepared: August 4, 2026

Company: VILIGANS COMMAND CORPORATION

Pilot site: Wheatland / Platte County, Wyoming

Status: Internal automation recommendation. This roster does not authorize external contact, email sending, filings, insurance binding, purchases, payments, deposits, public claims, DNS/admin changes, or PHI handling.

## Objective

Use focused agents to move the Wheatland launch sprint from prepared packets to countable proof while preserving CEO approval gates. All agents must write back to the source-controlled launch package, use official corporate identity controls, and treat unverified launch, authority, insurance, funding, and vehicle facts as unresolved until evidence is captured.

## Existing Agent

| Agent | Current status | Primary use | Approval rule |
|---|---:|---|---|
| VCC Corporate Email Approval Agent | Draft, not published | Prepare and send official corporate emails only after exact CEO approval; use the send batch register and approved packet language. | Requires CEO approval before publishing, draft creation, draft replacement, send, reply, forward, archive, label, attachment, or batch action. |

## Recommended Additional Agents

| Priority | Agent | Automates | Writes to | Must not do |
|---:|---|---|---|---|
| 1 | Launch Gatekeeper Agent | Daily stop/go review for August 5, August 7, August 9/10, August 12, and August 15 proof gates. | `65_August_Proof_Clock_Tracker_2026-08-03.csv`, `00_Launch_Package_Index.md`, dashboard summary. | Cannot mark launch ready without vehicle control, insurance, authority, driver, safety, funding, and approval evidence. |
| 2 | Proof Intake and Reconciliation Agent | Convert approved call/email/form responses into dated, countable proof entries; identify missing fields and stop-rule triggers. | `72_Batch_A_Response_Capture_Worksheet_2026-08-04.csv`, `63_Approved_Contact_Response_Intake_Worksheet_2026-08-03.csv`, `49_External_Response_Evidence_Log_2026-08-02.csv`, `52_Vehicle_Funding_Quote_Intake_Scorecard_2026-08-02.csv`. | Cannot invent proof, count verbal-only responses as written proof, or bypass next-approval fields. |
| 3 | Vehicle Authority and Insurance Agent | Track WYDOT/FMCSA authority questions, broker quote requirements, rental/lease/purchase fit, and bindability gaps. | `34_Vehicle_Insurance_Financing_Contact_Queue_2026-08-02.csv`, `44_Authority_Insurance_Quote_Request_Packet_2026-08-02.md`, `52_Vehicle_Funding_Quote_Intake_Scorecard_2026-08-02.csv`. | Cannot bind insurance, submit filings, reserve a vehicle, authorize a credit pull, or approve commercial passenger service. |
| 4 | Funding Close Agent | Maintain sponsor/readiness funding stack, Ramp/accounting evidence checklist, pledge status, quote-backed cash trigger, and August 9/10 funding decision. | `40_August_9_Funding_Close_Register_2026-08-02.csv`, `61_Minimum_Funding_Stack_And_Cash_Trigger_Memo_2026-08-02.md`, `VCC Funding/` trackers. | Cannot move funds, create invoices, accept money, approve debt, initiate card/spend actions, or represent funding as closed without proof. |
| 5 | Partner Capacity Agent | Screen Platte County partner-vehicle and local transportation capacity if rental, lease, purchase, insurance, authority, or cash proof slips. | `66_Partner_Vehicle_Pivot_Packet_2026-08-03.md`, `67_Partner_Vehicle_Capacity_Target_Register_2026-08-03.csv`, `08_Partner_MOU_Template_DRAFT.md`. | Cannot sign MOUs, promise service, exchange rider details, or represent partner capacity as secured without written confirmation. |
| 6 | Grants and Government Funding Agent | Monitor ICAM, WYDOT 5310/5311/5339, SAM/UEI, Grants.gov, and Medicaid provider path; draft grant and partner-support materials. | `10_Grant_Calendar_and_Funding_Path_DRAFT.md`, `04_SAM_VetCert_Readiness_Packet_DRAFT.md`, `20_Filing_Authority_and_Submission_Queue_2026-08-02.md`, `VCC Funding/`. | Cannot submit grants, certify eligibility, sign assurances, or file government forms without approval and officer review. |
| 7 | Workspace Security and Public Routing Agent | Track Google Workspace admin, DKIM/SPF/DMARC, Drive structure, website routing, SSL, and DNS status. | `16_Google_Workspace_Admin_Foundation_DRAFT.md`, `23_Public_Website_DNS_Change_Request_2026-08-02.md`, `foundation/google-workspace-foundation.md`. | Cannot change DNS, publish sites, alter admin roles, expose credentials, or handle PHI. |
| 8 | Compliance Binder Agent | Keep launch binder current for governance, driver files, operating policies, incident process, accessibility controls, and document-signature queue. | `03_Corporate_Governance_Action_Packet_DRAFT.md`, `05_WYDOT_Insurance_Vehicle_Readiness_Packet_DRAFT.md`, `06_NEMT_Operations_Manual_DRAFT.md`, `21_Document_Approval_Register_2026-08-02.md`. | Cannot treat unsigned drafts as executed records, approve service launch, or store medical/rider details outside approved controls. |

## Recommended Build Order

1. Publish the VCC Corporate Email Approval Agent only after exact CEO approval using `70_August_4_First_Proof_Activation_Packet_2026-08-04.md`.
2. Create Launch Gatekeeper Agent and Proof Intake and Reconciliation Agent as internal-only agents first. They create the highest value without external obligations.
3. Add Vehicle Authority and Insurance Agent once Batch A contact is approved, because response capture must reconcile directly into quote and authority gates.
4. Add Funding Close Agent after at least one written quote, sponsor, bridge, or pledge response exists, so it can rank real paths instead of assumptions.
5. Add Partner Capacity Agent if the August 5 vehicle proof gate or August 7 authority/insurance gate slips.
6. Add Grants and Government Funding Agent after SAM/UEI and Grants.gov status are verified.
7. Add Workspace Security and Public Routing Agent after admin access is confirmed.
8. Add Compliance Binder Agent before any paid passenger service, Medicaid/NEMT enrollment, or partner operating agreement is activated.

## Tooling Recommendations

| Need | Best tool or connector | Use |
|---|---|---|
| Official email packets | Gmail connector through the Corporate Email Approval Agent | Prepare, review, and send only exact CEO-approved messages. |
| Source-controlled proof updates | Codex workspace | Update CSVs, markdown packets, dashboard code, validation scripts, commits, and pushes. |
| Accounting/spend evidence | Ramp Data connector if available and approved | Read-only spend, card, reimbursement, and payment evidence for funding-close status. |
| Grants and official records | Web search plus Google Drive/Docs if connected | Refresh public sources, draft packets, and place evidence in the binder. |
| Workspace/domain controls | Google Workspace admin console and DNS provider, with manual approval | Verify DKIM, SPF, DMARC, MX, SSL, and admin access before outreach scaling. |

## Guardrails For Every Agent

- Use `aldavis@viliganscommandcorp.com` as the operating corporate identity unless a more specific approved role inbox is created.
- Keep all official corporate email write actions behind exact CEO approval.
- Keep all payments, deposits, financing, insurance binding, filings, signatures, publication, DNS/admin changes, and contract commitments behind exact approval.
- Do not store or process PHI or rider medical details until BAA, retention, access, and minimum-necessary controls are approved.
- Do not mark a launch, funding, vehicle, insurance, partner, grant, or authority item complete unless the evidence register points to dated proof.
- Keep retired vehicle-acquisition language out of active public and project surfaces; use only accessible passenger vehicle, ADA/specialty mobility vehicle, rental bridge, or approved partner vehicle language.

## Acceptance Criteria

The automation stack is launch-ready only when:

- Corporate Email Approval Agent is published with Gmail write actions approval-required.
- Launch Gatekeeper and Proof Intake agents can update the proof clock, response worksheet, evidence log, and scorecard without external contact.
- Batch A approved contacts have a response capture lane before any proof is counted.
- Funding Close Agent can distinguish cash received, pledge, bridge authorization, lease preapproval, written term sheet, and unverified lead.
- Vehicle Authority and Insurance Agent can separate quote, bindability, authority, filing, and launch-permission evidence.
- Every agent has a written no-obligation rule and a next-approval field for any action that could bind VCC.
