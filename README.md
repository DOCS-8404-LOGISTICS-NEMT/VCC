![Auto Assign](https://github.com/DOCS-8404-LOGISTICS-NEMT/demo-repository/actions/workflows/auto-assign.yml/badge.svg)

![Vite Build](https://github.com/DOCS-8404-LOGISTICS-NEMT/demo-repository/actions/workflows/proof-html.yml/badge.svg)

# VILIGANS COMMAND CORPORATION - DOCS NREMT & Logistics

This repository supports VILIGANS COMMAND CORPORATION (VCC) and DOCS NREMT & Logistics, a Wyoming-based non-emergency medical transportation (NEMT), logistics, and rural health access initiative.

The application provides a complete startup operations workspace for executive operations, funding, legal strategy, contract control, marketing, pilot vehicle acquisition governance, Wyoming compliance, and the first rural special-needs mobility pilot.

## Corporate identity

- Website: https://viliganscommandcorp.com
- Corporate email: aldavis@viliganscommandcorp.com
- Company: VILIGANS COMMAND CORPORATION
- Division: DOCS NREMT & Logistics

## Application structure

- `index.html` - Vite bootstrap page
- `src/main.js` - command center UI, operating data, and Amplitude events
- `src/config.js` - centralized VCC and analytics configuration
- `src/styles.css` - responsive operations workspace styling
- `AGENTS.md` - Codex operating instructions
- `foundation/google-workspace-foundation.md` - Google Workspace domain, email, Drive, and security foundation
- `foundation/launch_package/22_Immediate_Launch_Action_Packet_2026-08-02.md` - immediate launch-control packet for public website routing/SSL, pilot geography, anchor partner category, authority, insurance, SAM/Grants.gov, Medicaid, and DKIM
- `foundation/launch_package/25_Wheatland_Outreach_Target_Register_2026-08-02.csv` - first 20 Wheatland / Platte County outreach targets for approval
- `foundation/launch_package/26_Wheatland_Service_Boundary_and_Route_Cost_Model_2026-08-02.md` - internal Wheatland route-cost and service-boundary model
- `foundation/launch_package/27_Wheatland_One_Page_Pilot_Offer_2026-08-02.md` - controlled partner-facing Wheatland pilot offer draft
- `foundation/launch_package/28_Seven_Day_Funding_And_Midmonth_Vehicle_Sprint_2026-08-02.md` - seven-day Wheatland funding sprint and August 15 pilot vehicle possession plan
- `foundation/launch_package/29_Vehicle_Funding_Sprint_Register_2026-08-02.csv` - action register for funding, vehicle, authority, insurance, and website/DKIM sprint tasks
- `foundation/launch_package/30_Gmail_Packet_Send_Automation_Control_2026-08-02.md` - Gmail packet draft/send control workflow
- `foundation/launch_package/31_Gmail_Packet_Send_Queue_2026-08-02.csv` - target-level send queue for verified recipients and approved packet outreach
- `foundation/launch_package/32_Gmail_Template_Draft_Register_2026-08-02.csv` - register of unsent Gmail template drafts created for review
- `foundation/launch_package/33_Gmail_Recipient_Draft_Register_2026-08-02.csv` - register of verified-recipient Gmail packet drafts created for approval before sending
- `foundation/launch_package/34_Vehicle_Insurance_Financing_Contact_Queue_2026-08-02.csv` - verified vehicle, insurance, financing, and authority contact queue for the August 2026 sprint
- `foundation/launch_package/35_Vehicle_Insurance_Financing_Draft_Register_2026-08-02.csv` - register of unsent Gmail drafts created for vehicle and financing outreach review
- `foundation/launch_package/36_Vehicle_Funding_Sprint_Call_Sheet_2026-08-02.md` - call sequence and question set for August 3 vehicle, authority, insurance, and financing follow-up
- `foundation/launch_package/37_Public_Vehicle_Inventory_Shortlist_2026-08-02.csv` - public accessible-vehicle inventory shortlist for August 9 funding and August 15 possession diligence
- `foundation/launch_package/38_August_9_Funding_Vehicle_Go_No_Go_Memo_DRAFT.md` - draft decision memo for the August 9 funding and vehicle go/no-go gate
- `foundation/launch_package/39_Wheatland_Vehicle_Readiness_Sponsor_Commitment_DRAFT.md` - draft sponsor/readiness commitment form for Wheatland vehicle funding support
- `foundation/launch_package/40_August_9_Funding_Close_Register_2026-08-02.csv` - close register for funding evidence before the August 9 go/no-go gate
- `foundation/launch_package/41_CEO_Approval_Request_Send_And_Call_Packet_2026-08-02.md` - approval packet for controlled quote, authority, insurance, financing, and sponsor outreach
- `foundation/launch_package/42_August_2_Vehicle_Funding_Reality_Check_2026-08-02.md` - reality check for one-week funding and mid-month vehicle possession, with lease/rental-first execution order
- `foundation/launch_package/43_Gmail_Vehicle_Funding_Close_Draft_Register_2026-08-02.csv` - register of unsent Gmail funding-close sponsor/readiness drafts created for approval before sending
- `foundation/launch_package/44_Authority_Insurance_Quote_Request_Packet_2026-08-02.md` - WYDOT authority and insurance quote-prep packet for the Wheatland vehicle sprint
- `foundation/launch_package/45_Gmail_Authority_Draft_Register_2026-08-02.csv` - register of the unsent WYDOT authority question Gmail draft created for approval before sending
- `foundation/launch_package/46_August_3_Contact_Execution_Board_2026-08-02.md` - same-day contact execution board for approval, proof capture, and no-go triggers
- `foundation/launch_package/47_Web_Form_And_Call_Payloads_2026-08-02.md` - copy/paste web form and call payloads for vehicle, rental, insurance, and authority contacts
- `output/docx/VCC_Vehicle_Funding_Close_Packet_DRAFT.docx` - generated review packet for August 9 funding, vehicle, authority, insurance, and approval controls
- `archive/retired-projects/` - archive-only retired project history; not active launch, funding, outreach, or public material
- `VCC Funding/` - funding control lane for grants, sponsors, anchor partners, lender readiness, evidence, and approval gates
- `.github/workflows/proof-html.yml` - Vite production build validation
- `.env.example` - optional local environment override template

## Local development

```bash
npm install
npm run dev
```

Vite will print a local URL, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Startup operations workspace

The August 2, 2026 workspace includes six command centers:

- Google Workspace Foundation: domain, Gmail, sender authentication, role groups, Shared Drives, and HIPAA/BAA guardrails.
- Executive Dashboard: funding pipeline, open grants, active contracts, compliance tasks, marketing tasks, and pilot vehicle acquisition status.
- Grant Command Center: grant tracker, application calendar, required documents checklist, and funding opportunity database.
- Legal & Contract Center: bylaws repository, contract review workflow, pilot vehicle acquisition documents, and risk assessment tracker.
- Marketing & Growth Center: ad campaign planner, community outreach tracker, partnership pipeline, and social media content calendar.
- Pilot Launch Command Center: 90-day plan, Wyoming compliance checklist, NEMT readiness checklist, vehicle/equipment requirements, and budget/revenue projections.

## Current operating priorities

- Secure ICAM/WYDOT applicant path and local match strategy.
- Fix public website routing/SSL by aligning GitHub Pages settings and DNS records.
- Build Wheatland / Platte County as the pilot launch test site.
- Convert county, clinic, employer, and sponsor outreach into paid pilot revenue.
- Convert vehicle, insurance, and financing outreach into written quote inputs before the August 9 go/no-go gate.
- Complete corporate, insurance, operating authority, pilot vehicle, and driver readiness gates before launch.
- Preserve legal controls so VCC does not create obligations before executive authorization.
- Keep retired vehicle-acquisition history archive-only; active launch materials use accessible passenger vehicle and ADA/specialty mobility vehicle language.
- Track launch metrics: trips, denials, cost per trip, revenue, safety incidents, support letters, and partner referrals.
- Finish Google Workspace controls: DKIM, sender review, operating groups, Shared Drives, and compliance sharing rules.

## Google Workspace foundation

Use `aldavis@viliganscommandcorp.com` as the official corporate admin/officer identity for project metadata, public contact, grant readiness, and Workspace setup. Keep the Workspace runbook in `foundation/google-workspace-foundation.md` and the launch-package draft in `foundation/launch_package/16_Google_Workspace_Admin_Foundation_DRAFT.md`.

Public DNS already shows Google Workspace MX and domain verification records. SPF, DKIM, DMARC reporting, Shared Drives, and HIPAA/BAA controls must be verified before high-volume outreach or any medical-adjacent rider records.

## Amplitude events

The application currently emits:

- `VCC Page Viewed`
- `VCC Website Clicked`
- `VCC Contact Intent`
- `VCC Service Area Interest`
- `VCC Funding Interest`
- `VCC Command Center Opened`
- `VCC Funding Opportunity Viewed`
- `VCC Source Opened`

Each event includes the shared VCC company, division, corporate email, website context, and current review date.

## Environment configuration

The browser SDK may read `VITE_AMPLITUDE_API_KEY` from `.env.local`. The Amplitude project API key is client-visible by design; passwords, GitHub tokens, OpenAI API keys, and other private credentials must never be committed.

## Repository status

The repository remains private while VCC develops internal business and technical infrastructure. Private visibility does not prevent browser-side Amplitude event ingestion, but GitHub and Codex integrations require explicit repository access.
