![Auto Assign](https://github.com/DOCS-8404-LOGISTICS-NEMT/demo-repository/actions/workflows/auto-assign.yml/badge.svg)

![Vite Build](https://github.com/DOCS-8404-LOGISTICS-NEMT/demo-repository/actions/workflows/proof-html.yml/badge.svg)

# VILIGANS COMMAND CORPORATION - DOCS NREMT & Logistics

This repository supports VILIGANS COMMAND CORPORATION (VCC) and DOCS NREMT & Logistics, a Wyoming-based non-emergency medical transportation (NEMT), logistics, and rural health access initiative.

The application provides a complete startup operations workspace for executive operations, funding, legal strategy, contract control, marketing, vehicle acquisition governance, Wyoming compliance, and the first rural special-needs mobility pilot.

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

The August 1, 2026 workspace includes six command centers:

- Google Workspace Foundation: domain, Gmail, sender authentication, role groups, Shared Drives, and HIPAA/BAA guardrails.
- Executive Dashboard: funding pipeline, open grants, active contracts, compliance tasks, marketing tasks, and vehicle acquisition status.
- Grant Command Center: grant tracker, application calendar, required documents checklist, and funding opportunity database.
- Legal & Contract Center: bylaws repository, contract review workflow, vehicle acquisition documents, and risk assessment tracker.
- Marketing & Growth Center: ad campaign planner, community outreach tracker, partnership pipeline, and social media content calendar.
- Pilot Launch Command Center: 90-day plan, Wyoming compliance checklist, NEMT readiness checklist, vehicle/equipment requirements, and budget/revenue projections.

## Current operating priorities

- Secure ICAM/WYDOT applicant path and local match strategy.
- Convert county, clinic, employer, and sponsor outreach into paid pilot revenue.
- Complete corporate, insurance, operating authority, vehicle, and driver readiness gates before launch.
- Preserve legal controls so VCC does not create obligations before executive authorization.
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
