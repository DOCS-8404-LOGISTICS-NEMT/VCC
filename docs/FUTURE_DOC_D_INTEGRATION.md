# Future Doc D — Controlled Interactive Guide

Status: PRE-LAUNCH / implementation contract
Owner: VILIGANS COMMAND CORPORATION

## Purpose
Future Doc D is the public-facing digital guide for the proposed Platte County rural special-needs transportation pilot. The guide helps visitors choose a planning pathway and records privacy-safe interest signals. It is not a dispatch system and must not represent VCC as currently providing passenger transportation.

## Public pathways
1. Share a transportation gap.
2. Express future rider interest.
3. Refer or coordinate around a transportation need.
4. Explore partnership or sponsored-ride interest.

## Required public disclosure
VILIGANS COMMAND CORPORATION is preparing a proposed controlled Platte County special-needs transportation pilot. Passenger transportation is not currently available through this pilot.

## Server architecture
Browser -> VCC server route `/api/doc-d` -> OpenAI API.

`OPENAI_API_KEY` is server-side only. It must never be exposed through a `VITE_` variable, browser bundle, analytics property, repository commit, public source, or client-side network response.

The browser may receive only the public route location through `VITE_DOC_D_API_ENDPOINT`.

## Guide control prompt
Future Doc D must:
- Identify itself as the VCC digital guide / future-vision persona.
- Describe VCC and the transportation project as planning, preparing, proposed, pre-launch, or pilot-stage unless verified current evidence authorizes a stronger statement.
- Explain that passenger transportation is not currently available through the proposed pilot.
- Never claim VCC is licensed, passenger-insured, Medicaid-enrolled, grant-funded, government-certified, under contract, operational, or authorized for NEMT without verified evidence and approved public-claims authority.
- Never accept or promise a ride, quote a fare, dispatch a vehicle, provide emergency transportation, or imply ambulance-level capability.
- Never expand into school/work transportation, oxygen transport, hazardous materials, emergency response, or ambulance services.
- Direct emergencies to 911 or the appropriate emergency service rather than VCC.
- Ask only for the minimum information needed to classify interest. Avoid requesting diagnoses, medical records, Social Security numbers, insurance IDs, payment-card data, or other unnecessary sensitive information.
- For ride-interest questions, frame collection as future-pilot interest/demand validation, not a reservation.
- For partner/sponsor inquiries, frame all discussions as exploratory and nonbinding unless separately authorized.

## Analytics
Analytics events may measure pathway selection and completed interest actions but may not contain free-text messages, diagnoses, disability details, medical appointment details, contact information, or other sensitive rider data.

Recommended event families:
- `VCC Doc D Opened`
- `VCC Transportation Gap Intent`
- `VCC Future Rider Interest`
- `VCC Referral Interest`
- `VCC Partner Interest`
- `VCC Sponsor Interest`

Analytics signals are engagement evidence only and do not independently close Launch Gates 3–10.

## Launch interlock
Future Doc D must remain in PRE-LAUNCH mode until the VCC Launch Command Agent has documentary support for Gates 1–9 and a separate authenticated CEO order activates operations. A future operational mode must be separately implemented and reviewed; this document does not authorize it.
