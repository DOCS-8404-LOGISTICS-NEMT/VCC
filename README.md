![Auto Assign](https://github.com/DOCS-8404-LOGISTICS-NEMT/demo-repository/actions/workflows/auto-assign.yml/badge.svg)

![Vite Build](https://github.com/DOCS-8404-LOGISTICS-NEMT/demo-repository/actions/workflows/proof-html.yml/badge.svg)

# VILIGANS COMMAND CORPORATION - DOCS NREMT & Logistics

This repository supports VILIGANS COMMAND CORPORATION (VCC) and DOCS NREMT & Logistics, a Wyoming-based non-emergency medical transportation (NEMT), logistics, and rural health access initiative.

The application provides a complete startup operations workspace for executive operations, funding, legal strategy, contract control, marketing, vehicle/RV acquisition governance, Wyoming compliance, and the first rural special-needs mobility pilot.

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

The August 1, 2026 workspace includes five command centers:

- Executive Dashboard: funding pipeline, open grants, active contracts, compliance tasks, marketing tasks, and vehicle acquisition status.
- Grant Command Center: grant tracker, application calendar, required documents checklist, and funding opportunity database.
- Legal & Contract Center: bylaws repository, contract review workflow, RV acquisition documents, and risk assessment tracker.
- Marketing & Growth Center: ad campaign planner, community outreach tracker, partnership pipeline, and social media content calendar.
- Pilot Launch Command Center: 90-day plan, Wyoming compliance checklist, NEMT readiness checklist, vehicle/equipment requirements, and budget/revenue projections.

## Current operating priorities

- Secure ICAM/WYDOT applicant path and local match strategy.
- Convert county, clinic, employer, and sponsor outreach into paid pilot revenue.
- Complete corporate, insurance, operating authority, vehicle/RV, and driver readiness gates before launch.
- Preserve legal controls so VCC does not create obligations before executive authorization.
- Track launch metrics: trips, denials, cost per trip, revenue, safety incidents, support letters, and partner referrals.

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
