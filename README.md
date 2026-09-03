![Auto Assign](https://github.com/DOCS-8404-LOGISTICS-NEMT/demo-repository/actions/workflows/auto-assign.yml/badge.svg)

![Vite Build](https://github.com/DOCS-8404-LOGISTICS-NEMT/demo-repository/actions/workflows/proof-html.yml/badge.svg)

# VILIGANS COMMAND CORPORATION (VCC)

This repository supports VILIGANS COMMAND CORPORATION (VCC), a Wyoming corporation developing business infrastructure, automation systems, and a proposed Platte County rural special-needs transportation pilot.

The transportation initiative remains in **PRE-LAUNCH / PLANNING** status. VCC is evaluating documented transportation gaps, regulatory requirements, partnerships, funding pathways, insurance, vehicle configuration, driver qualifications, and operational controls before determining whether passenger operations may begin.

Nothing in this repository should be interpreted as representing that VCC currently provides passenger transportation, NEMT, ambulance, emergency medical transportation, or other regulated transportation services.

## Corporate identity

- Website: https://viliganscommandcorp.com
- Corporate email: aldavis@viliganscommandcorp.com
- Company: VILIGANS COMMAND CORPORATION
- Current public-facing entity: VILIGANS COMMAND CORPORATION
- Pilot location: Platte County, Wyoming
- Pilot posture: Proposed, scheduled, pre-booked, non-emergency rural special-needs transportation

## Authorization and operating posture

VCC currently operates under a controlled **CONTINUE PLANNING / HOLD OPERATIONS** posture for the transportation pilot.

Planning, research, controlled simulations, evidence collection, qualification-matrix development, readiness testing, and corrective-action analysis may proceed within approved scope.

Passenger operations and financial or contractual commitments remain prohibited until applicable readiness gates are supported by verified evidence and a separate written executive authorization activates operations.

Repository code, documentation, dashboards, simulations, or technical readiness do **not** independently constitute authorization to:

- transport passengers;
- represent transportation service as currently available;
- bind insurance;
- purchase, lease, finance, or take possession of a vehicle;
- execute contracts or incur financial obligations;
- accept paid transportation engagements; or
- close a launch gate without supporting evidence and required authorization.

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

The workspace includes six command centers:

- **Google Workspace Foundation:** domain, corporate email, sender authentication, role groups, Shared Drives, and security/compliance guardrails.
- **Executive Dashboard:** funding pipeline, readiness evidence, compliance tasks, outreach status, and vehicle/insurance planning.
- **Grant Command Center:** grant tracker, application calendar, required-document checklist, funding opportunities, match strategy, and eligible-applicant pathways.
- **Legal & Contract Center:** corporate records, draft contract controls, vehicle-acquisition planning documents, and risk assessment tracking.
- **Marketing & Growth Center:** community-demand outreach, partnership pipeline, public-information controls, survey activity, and social-media planning.
- **Pilot Launch Command Center:** launch-gate evidence, Platte County demand analysis, compliance readiness, vehicle/accessibility requirements, driver/safety qualification controls, simulations, and proposed pilot economics.

## Current operating priorities

- Build the documented Platte County unmet-demand and non-duplication case.
- Establish the appropriate WYDOT/transit funding, applicant, coordination, procurement, and local-match pathways.
- Obtain written regulatory and operating-authority determinations applicable to the proposed service model.
- Obtain nonbinding passenger-transportation insurance planning evidence before any binding decision.
- Define and validate the proposed vehicle and accessibility configuration.
- Complete driver qualification, background-check, competency, training, and driver-file requirements before operations.
- Test dispatch, inspection, winter-weather, emergency, incident, complaint, and corrective-action systems through controlled simulations.
- Develop partner referral, sponsored-ride, healthcare-access, veteran-access, and community-coordination pathways without representing that service is currently available.
- Preserve corporate and authorization controls so VCC does not create operational, contractual, or financial obligations before executive authorization.
- Maintain evidence sufficient for an objective GO / HOLD / NO-GO launch decision.

## Pre-launch evidence and metrics

Until passenger operations are separately authorized, VCC measures **readiness and demonstrated need**, not operating performance.

Current pre-launch measures include:

- transportation-gap survey responses;
- documented unmet or denied transportation demand;
- qualifying human and stakeholder responses;
- partner and referral interest;
- healthcare, veteran, senior, disability, and rural-access evidence where available;
- stakeholder coverage and response rates;
- support, coordination, or non-duplication evidence;
- regulatory determinations received;
- insurance planning evidence;
- vehicle/accessibility readiness evidence;
- driver and safety qualification evidence;
- controlled simulation and CAPA results;
- funding and eligible-applicant pathway status; and
- launch-gate status and unresolved blockers.

Operational metrics such as completed trips, passenger revenue, cost per completed trip, safety incidents during service, and operating denials become applicable only after passenger operations are separately authorized.

## Launch controls

The proposed pilot may not transition to passenger operations solely because software, outreach, funding research, a vehicle, insurance quote, or individual readiness documents exist.

Before operational activation, VCC requires objective evidence supporting the applicable launch gates, including regulatory authority, insurance, vehicle/accessibility readiness, driver qualifications, tested operating and safety systems, and final written executive authorization.

Until then, public communications must accurately identify the program as **proposed**, **pre-launch**, or **under evaluation** and must not imply that rides are currently available.

## Google Workspace foundation

Use `aldavis@viliganscommandcorp.com` as the designated corporate admin/officer identity for project metadata, corporate communications, grant-readiness planning, and Workspace configuration once the account and required services are verified operational.

Keep the Workspace runbook in `foundation/google-workspace-foundation.md` and the launch-package draft in `foundation/launch_package/16_Google_Workspace_Admin_Foundation_DRAFT.md`.

Domain DNS, MX routing, SPF, DKIM, DMARC, account/server connectivity, Shared Drives, access controls, and any applicable medical-adjacent privacy safeguards must be **verified rather than assumed** before the corresponding capability is treated as production-ready.

Do not store or transmit protected or sensitive rider information through systems that have not been approved and configured for the applicable privacy and security requirements.

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

Each event includes the configured VCC company, corporate email, website context, and current review context where implemented.

Analytics events measure digital interaction and interest. Traffic, clicks, form activity, or analytics events do **not** by themselves prove unmet transportation demand, regulatory compliance, partner commitment, funding eligibility, or launch-gate completion.

## Environment configuration

The browser SDK may read `VITE_AMPLITUDE_API_KEY` from `.env.local`. The Amplitude project API key is client-visible by design; passwords, GitHub tokens, OpenAI API keys, OAuth client secrets, private signing keys, and other credentials must never be committed to the repository.

## Repository status

The repository remains private while VCC develops internal business and technical infrastructure. Private visibility does not prevent browser-side Amplitude event ingestion, but GitHub, Codex, deployment, and other integrations require explicit repository access and appropriate authorization.

## Source and claim control

Repository documentation should distinguish among:

1. **Verified facts** supported by current evidence;
2. **Planning assumptions** used for analysis or simulation;
3. **Proposed capabilities** that have not been activated; and
4. **Authorized operations** supported by completed readiness requirements and executive authorization.

When a statement could imply that VCC currently possesses an approval, certification, insurance policy, operational capability, funding commitment, partnership, or transportation authority, verify the supporting evidence before publishing or relying on that statement.


