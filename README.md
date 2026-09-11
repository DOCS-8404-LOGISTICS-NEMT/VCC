![Vite Build](https://github.com/DOCS-8404-LOGISTICS-NEMT/VCC/actions/workflows/proof-html.yml/badge.svg)

# VILIGANS COMMAND CORPORATION (VCC)

This private repository supports VILIGANS COMMAND CORPORATION (VCC), a Wyoming corporation developing business infrastructure, automation systems, and a proposed Platte County rural special-needs transportation pilot.

The transportation initiative remains in **PRE-LAUNCH / PLANNING** status. VCC is evaluating transportation gaps, regulatory requirements, partnerships, funding pathways, insurance, vehicle configuration, driver qualifications, and operational controls before deciding whether passenger operations may begin.

Nothing in this repository represents that VCC currently provides passenger transportation, NEMT, ambulance service, emergency medical transportation, or another regulated transportation service.

## Corporate identity and web architecture

- Company: VILIGANS COMMAND CORPORATION
- Current public-facing entity: VILIGANS COMMAND CORPORATION
- Corporate email: aldavis@viliganscommandcorp.com
- Active pre-launch evidence-gathering site: https://www.viliganscommandcorp.com
- Reserved future Doc D AI domain: https://viliganscommandcorp.com
- Proposed pilot location: Platte County, Wyoming
- Proposed service scope: scheduled, pre-booked, non-emergency, non-ambulance rural special-needs transportation
- Excluded scope: school/work transportation, oxygen transport, hazardous materials, emergency response, and ambulance-level service

The apex domain is reserved for a future Doc D AI deployment after grant funding and final pilot authorization. It is outside the current launch scope. This repository is not presumed to be the deployment source for the live pre-launch website until provider-native source and version evidence confirms that relationship.

## Authorization and operating posture

VCC operates under **CONTINUE PLANNING / HOLD OPERATIONS** for the proposed transportation pilot.

Planning, research, controlled simulations, evidence collection, qualification-matrix development, readiness testing, and corrective-action analysis may proceed within approved scope.

Passenger operations and reserved actions remain prohibited until the applicable readiness gates are supported by verified evidence and separate written executive authorization activates operations.

Repository code, documentation, dashboards, simulations, builds, analytics, or technical readiness do **not** independently authorize VCC to:

- transport passengers or represent rides as available;
- claim licensing, insurance, funding, Medicaid enrollment, certification, or executed partnerships;
- bind insurance;
- purchase, lease, finance, or take possession of a vehicle;
- execute contracts or incur financial obligations;
- accept paid transportation engagements;
- process public-intake responses without separate authorization; or
- close a launch gate without qualifying evidence and required authority.

Gate 10 and the final launch decision remain exclusively with the President/CEO.

## Application structure

- `index.html` — Vite bootstrap page and planning-stage metadata
- `src/main.js` — pre-launch planning UI and guarded analytics initialization
- `src/config.js` — centralized VCC and analytics configuration
- `src/styles.css` — responsive presentation
- `AGENTS.md` — controlled Codex instructions
- `foundation/google-workspace-foundation.md` — proposed Workspace foundation
- `.github/workflows/proof-html.yml` — Vite build validation
- `.github/workflows/deploy-pages.yml` — disabled legacy Pages workflow
- `.env.example` — optional local environment template

## Local validation

```bash
npm install
npm run build
npm run preview
```

The production build output is written to `dist/`. A successful build proves only that the repository source compiles; it does not establish deployment, production hosting, analytics receipt, intake approval, or launch readiness.

## Current pre-launch priorities

- Build attributable Platte County unmet-demand and non-duplication evidence.
- Establish the applicable WYDOT funding, eligible-applicant, coordination, procurement, and local-match pathways.
- Obtain written regulatory and operating-authority determinations for the proposed service model.
- Obtain nonbinding passenger-transportation insurance requirements and planning costs.
- Define and validate the proposed vehicle and accessibility configuration.
- Complete driver qualification, background-check, competency, training, and driver-file requirements.
- Test dispatch, inspection, winter-weather, incident, complaint, emergency, and corrective-action systems through controlled simulations.
- Develop proposed partner, referral, sponsored-ride, healthcare-access, veteran-access, and community-coordination pathways without implying an executed relationship or available service.
- Maintain evidence sufficient for an objective GO / HOLD / NO-GO decision.

## Public intake control

The questionnaire is currently treated as unavailable in this repository while privacy, retention, deletion, access, partial-response, and authorization controls are evaluated.

The separate CEO decision between temporary disablement and an expressly approved interim collection rule remains outstanding. Existing responses must not be opened, exported, summarized, scored, contacted, or otherwise processed without separate authorization.

Questionnaire traffic, aggregate response-count metadata, or response contents may be used only within their separately approved collection and processing authority. They do not by themselves prove unmet demand or close a launch gate.

## Amplitude status

The current source contains guarded client-side instrumentation intended to emit `VCC Page Viewed` after successful initialization.

Production configuration, event receipt, deployed-source identity, and the required smoke test remain independently verifiable controls. The source code alone is not proof that production analytics are working.

The browser SDK may read `VITE_AMPLITUDE_API_KEY` from `.env.local` or the build environment. The Amplitude project API key is client-visible by design. Passwords, GitHub tokens, OpenAI API keys, OAuth secrets, signing keys, and other credentials must never be committed.

Analytics measure digital interaction. They do not prove demand, regulatory compliance, partner commitment, funding eligibility, operational readiness, or gate completion.

## Source and claim control

Repository materials must distinguish:

1. **Verified facts** supported by attributable current evidence;
2. **Planning assumptions** used for analysis or simulation;
3. **Proposed capabilities** that have not been activated; and
4. **Authorized operations** supported by verified readiness requirements and written executive authorization.

Draft and historical launch-package files may contain superseded assumptions. They must not override the current mission ledger, authenticated CEO directives, current agency evidence, or this repository’s controlled pre-launch posture.
