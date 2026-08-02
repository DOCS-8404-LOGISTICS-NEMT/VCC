# Immediate Launch Action Packet

VILIGANS COMMAND CORPORATION

Prepared: August 2, 2026

Status: Active execution-control packet. Preparation work is authorized. DNS changes, GitHub Pages settings changes, regulatory filings, SAM/Grants.gov submissions, Medicaid enrollment, insurance bind orders, contracts, MOUs, sponsorship agreements, vehicle transactions, and paid passenger service remain approval-gated.

## Executive Summary

VCC is ready to move from internal readiness into a controlled funding and partner-readiness launch. VCC is not ready to launch paid passenger service until operating authority, insurance, vehicle, driver, privacy, and partner gates are complete.

Planning decision made for execution momentum:

- Pilot geography: Sheridan County, Wyoming, using Sheridan and nearby rural communities as the first planning service area until the CEO overrides it.
- Anchor partner category: healthcare care-coordination partner, such as a rural hospital, clinic, FQHC, dialysis, rehabilitation, or discharge/case-management team.
- Initial service posture: scheduled, non-emergency, non-ambulance transportation planning only; no public rider transport until launch gates are complete.

## 1. Public Website Routing And SSL

### Current Observed State

| Item | Current status | Launch implication |
|---|---|---|
| Local website build | `npm run build` passes. | Source is build-ready. |
| GitHub Pages workflow | `.github/workflows/deploy-pages.yml` exists and builds `dist`. | Repository-side deploy workflow exists. |
| `public/CNAME` | Contains `viliganscommandcorp.com`. | Helpful if branch publishing is later used; GitHub says Actions publishing stores custom-domain settings separately. |
| Apex DNS | `viliganscommandcorp.com` currently resolves to `66.223.49.89`. | Not pointing to GitHub Pages. |
| `www` DNS | `www.viliganscommandcorp.com` is a CNAME to `ghs.googlehosted.com`. | Not pointing to GitHub Pages. |
| HTTPS check | `https://viliganscommandcorp.com` and `https://www.viliganscommandcorp.com` fail SSL locally. | Public launch is blocked until host/DNS/certificate align. |
| GitHub Pages URL | `https://docs-8404-logistics-nemt.github.io/demo-repository/` returns `404`. | Pages source/settings or deploy state needs GitHub-side review. |

### Required GitHub Settings

1. Repository: `DOCS-8404-LOGISTICS-NEMT/demo-repository`.
2. Go to GitHub repository Settings -> Pages.
3. Set source to GitHub Actions.
4. Set custom domain to `viliganscommandcorp.com`.
5. After DNS is valid and GitHub provisions the certificate, enable Enforce HTTPS.

### Required DNS Records If GitHub Pages Is The Host

Do not change MX/TXT mail records while changing website records.

| Host | Type | Value | Action |
|---|---|---|---|
| `@` | `A` | `185.199.108.153` | Replace the current non-GitHub apex A record. |
| `@` | `A` | `185.199.109.153` | Add/keep as GitHub Pages apex record. |
| `@` | `A` | `185.199.110.153` | Add/keep as GitHub Pages apex record. |
| `@` | `A` | `185.199.111.153` | Add/keep as GitHub Pages apex record. |
| `www` | `CNAME` | `DOCS-8404-LOGISTICS-NEMT.github.io` | Replace `ghs.googlehosted.com` if GitHub Pages is the website host. |

Optional IPv6 records:

| Host | Type | Value |
|---|---|---|
| `@` | `AAAA` | `2606:50c0:8000::153` |
| `@` | `AAAA` | `2606:50c0:8001::153` |
| `@` | `AAAA` | `2606:50c0:8002::153` |
| `@` | `AAAA` | `2606:50c0:8003::153` |

### Website Stop/Go

Go for source deployment after commit and push.

No-go for public-domain launch until:

1. GitHub Pages settings confirm the Actions deployment source.
2. The custom domain is saved in GitHub Pages settings.
3. Apex and `www` DNS point to GitHub Pages.
4. HTTPS certificate is issued and Enforce HTTPS is available.
5. `https://viliganscommandcorp.com` returns the VCC site.

## 2. Document And Funding Change Control

### Current Decision

Commit the current safe internal document, launch packet, and funding-control changes after build verification.

### Hold From External Execution

- Do not file state, federal, SAM, Grants.gov, Medicaid, WYDOT, insurance, or grant submissions from the repo.
- Do not send outreach, insurance requests, sponsor asks, or partner MOUs until approved.
- Do not represent VCC as insured, WYDOT-authorized, Medicaid-enrolled, SDVOSB/VetCert-certified, or operationally launched until evidence is verified.

## 3. Pilot County And Anchor Partner

### Planning Selection

| Decision | Selection | Reason |
|---|---|---|
| Pilot county | Sheridan County, Wyoming | Aligns with the current Wyoming corporate filing address and gives a narrow first planning geography. |
| First planning hub | Sheridan and nearby rural communities | Practical first service boundary for outreach, mapping, dispatch assumptions, and cost estimates. |
| Anchor partner category | Healthcare care-coordination partner | Highest match to recurring NEMT/special-needs transportation need and partner-funded readiness fee. |
| First target types | Hospital, rural clinic, FQHC, dialysis, rehab, discharge planning, case management | Produces referral workflow, unmet-need evidence, support letters, and possible paid pilot. |

### Initial Partner Offer

- 90-day readiness pilot.
- Weekly reporting on requested rides, completed rides, denied rides, wait times, unmet needs, safety events, and cost per ride.
- Scheduled non-emergency rides only.
- Limited service area and approved trip categories.
- Monthly readiness fee plus per-trip or ride-block pricing after authority and insurance gates are complete.

### First Outreach List To Build

1. Sheridan-area hospital or clinic care-coordination lead.
2. Dialysis or recurring-care provider.
3. County public health or human services contact.
4. Senior center or disability provider.
5. VSO/SVSA contact for veteran mobility support.
6. Local sponsor candidates: bank, healthcare vendor, insurer, energy company, civic group, church, or employer.

## 4. WYDOT And FMCSA Operating Authority Path

### Current Interpretation

VCC should treat compensated Wyoming passenger transportation as potentially requiring Wyoming intrastate operating-authority review before service begins. If any ride crosses state lines, serves interstate travel, or is for-hire passenger service in interstate commerce, FMCSA USDOT and operating-authority analysis is required.

### WYDOT Call Script

Use this exact controlled language:

> VILIGANS COMMAND CORPORATION is preparing a small scheduled, non-emergency, non-ambulance passenger transportation pilot in Sheridan County. The pilot may serve seniors, individuals with disabilities, veterans, and healthcare-access riders through partner referrals, private pay, sponsorships, or contracts. We need to confirm whether Wyoming intrastate operating authority, MC-100 filing, Form E insurance filing, USDOT number, vehicle markings, driver qualification, inspection, or other state requirements apply before any compensated passenger service begins.

### WYDOT Questions

1. Does a scheduled, non-emergency, non-ambulance passenger pilot require Wyoming intrastate operating authority?
2. Is MC-100 required for VCC or the operating subsidiary if trips are compensated through partners, sponsors, or private pay?
3. Does the answer change for senior, disability, veteran, clinic, or NEMT-adjacent rides?
4. Is Form E or any other insurer-submitted filing required?
5. Are ACORD certificates, binders, or insurance cards insufficient for the state authority file?
6. Does WYDOT require a USDOT number for the planned vehicle capacity, service type, or intrastate operation?
7. What driver, vehicle inspection, marking, maintenance, complaint, and safety records must be kept?
8. Are county or local passenger-for-hire permits required in Sheridan County or the City of Sheridan?

### FMCSA Decision Screen

Do not assume no federal filing. Screen for:

- Interstate trips.
- Airport or interstate travel connections.
- For-hire passenger transportation.
- Vehicle designed or used to transport more than 8 passengers including driver for compensation.
- Vehicle designed or used to transport more than 15 passengers including driver, even if not compensated.
- Vehicle GVWR, GCWR, or actual weight at or above federal thresholds.

## 5. Commercial Passenger/NEMT Insurance Quote Request

### Quote Request Status

Prepared, not sent.

### Broker Request Template

Subject: VCC Wyoming scheduled passenger/NEMT-adjacent pilot insurance quote request

VILIGANS COMMAND CORPORATION is preparing a controlled Sheridan County, Wyoming scheduled, non-emergency, non-ambulance transportation pilot. We need quote guidance before launch and before any paid passenger service.

Please quote or advise required underwriting data for:

- Commercial auto for scheduled passenger transportation / NEMT-adjacent service.
- General liability.
- Professional or operational E&O if applicable.
- Abuse/molestation coverage if required for vulnerable riders.
- Workers compensation or occupational accident path.
- Umbrella/excess coverage.
- Cyber/privacy coverage for referral and rider records.
- Any WYDOT Form E or other operating-authority filing requirements.

Current planning assumptions:

- Service area: Sheridan County, Wyoming.
- Service model: scheduled, non-emergency, non-ambulance rides only.
- Rider groups: seniors, individuals with disabilities, veterans, healthcare-access riders, and partner referrals.
- Vehicle: accessible passenger van preferred; final vehicle not selected.
- Drivers: primary and backup driver files to include license, MVR, background, training, and insurer approval.
- Operations: no paid rides until authority, insurance, vehicle, driver, operating manual, privacy, and incident-response gates are approved.

Please identify:

1. Minimum vehicle data needed for a bindable quote.
2. Driver eligibility standards.
3. Required coverage limits and exclusions.
4. Whether wheelchair securement or passenger-assistance training changes underwriting.
5. Whether any broker/insurer filings are required for WYDOT authority.
6. Earliest coverage effective date after complete application.

### Insurance No-Go Gates

- No passenger transport using personal or non-commercial coverage.
- No public launch claim that VCC is insured until binder and filings are complete.
- No vehicle purchase or lease until insurer confirms eligibility and expected premium range.

## 6. SAM/UEI And Grants.gov Verification

### Current Status

Not verified in this workspace. Requires user-controlled Login.gov/SAM.gov access and sensitive entity/tax/bank data that must not be stored in the repository.

### SAM.gov Verification Steps

1. Sign in through Login.gov at SAM.gov.
2. Search Entity Workspace for `VILIGANS COMMAND CORPORATION`.
3. Confirm whether a Unique Entity ID exists.
4. Confirm registration status, expiration date, entity name, physical address, mailing address, NAICS, assertions, reps/certs, and EFT/remittance status.
5. Save only non-sensitive evidence in the corporate binder: entity name, UEI, status, expiration, CAGE if issued, and permitted public profile evidence.
6. Keep TIN, bank, taxpayer, personal identity, and Login.gov information out of the repo.

### Grants.gov Verification Steps

1. Confirm SAM registration is active or in progress.
2. Create or verify the Grants.gov applicant account for the EBiz POC using the email tied to SAM where required.
3. Add an organization applicant profile using the UEI.
4. Assign Authorized Organization Representative permissions only after officer authority is signed.
5. Do not submit grant certifications until corporate authority, budget, partner strategy, and source evidence are complete.

## 7. Wyoming Medicaid / NEMT Provider Path

### Current Status

Not verified. Do not assume Medicaid revenue.

### Verification Route

1. Contact Wyoming Medicaid Provider Services.
2. Ask whether VCC, DOCS 8404 Logistics & NEMT LLC, or another entity path may enroll as a taxi or non-taxi ride provider.
3. Confirm taxonomy/provider type requirements.
4. Confirm vehicle, insurance, driver, trip verification, prior authorization, claims, audit, and payment requirements.
5. Confirm whether a separate provider number is required for NEMT services.
6. Do not collect or store rider medical, Medicaid ID, disability, diagnosis, or trip-purpose health information in this repo.

### Medicaid Call Script

> VILIGANS COMMAND CORPORATION is preparing a Wyoming scheduled, non-emergency transportation pilot and needs to understand the provider enrollment route for NEMT or travel-assistance transportation. We are not submitting claims yet. We need to confirm provider type, taxonomy, vehicle/driver requirements, insurance, trip verification, billing route, and whether a separate provider number is required.

## 8. Google Workspace DKIM Verification

### Current Observed State

| Record | Status |
|---|---|
| Gmail MX | `SMTP.GOOGLE.com` present at priority 1. |
| Google verification TXT | Present. |
| SPF | Present but does not include Google's standard SPF sender include. |
| DKIM | Common `google._domainkey` selector not found in public DNS. |
| DMARC | Present at `p=quarantine`, reporting to BusinessIdentity mailboxes. |

### DKIM Setup Steps

1. Sign in as a Google Workspace super administrator.
2. Go to Admin console -> Apps -> Google Workspace -> Gmail -> Authenticate email.
3. Select `viliganscommandcorp.com`.
4. Generate the DKIM key.
5. Add the Google-provided TXT record at DNS, usually under a selector such as `google._domainkey`.
6. Return to Google Admin and start authentication after DNS propagates.
7. Confirm outbound test messages pass SPF, DKIM, and DMARC.

### SPF Review

Do not add a second SPF record. If Gmail sends outbound mail and BusinessIdentity still sends mail, consolidate approved senders into one SPF record after review.

Possible final SPF shape if both Google and BusinessIdentity are approved senders:

`v=spf1 a mx include:_spf.google.com include:spf.postal.businessidentity.llc ~all`

Final SPF must be confirmed against every active sender before DNS change.

## Launch Go/No-Go

| Area | Current launch decision |
|---|---|
| Internal readiness launch | Go after this packet is committed. |
| Funding and partner planning | Go for controlled conversations using readiness language after approval. |
| Website public domain | No-go until DNS, GitHub Pages settings, and HTTPS are fixed. |
| Paid passenger service | No-go until WYDOT/FMCSA, insurance, vehicle, driver, privacy, and operating gates are complete. |
| Medicaid billing | No-go until provider path and enrollment are verified. |
| Grant submissions | No-go until SAM/UEI, Grants.gov, authority, budget, and partner facts are verified. |

## Source Links Checked

- GitHub Pages custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- GitHub Pages custom-domain troubleshooting: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages
- WYDOT Intrastate Operating Authority: https://www.dot.state.wy.us/home/trucking_commercial_vehicles/operating_authority.html
- WYDOT MC-100 application PDF: https://www.dot.state.wy.us/files/live/sites/wydot/files/shared/Motor%20Vehicle%20Services/IRP_IFTA/MC-100%20Wyoming%20Operating%20Authority%20Application%202026-01.pdf
- FMCSA USDOT number screening: https://www.fmcsa.dot.gov/registration/do-i-need-usdot-number
- FMCSA passenger operating authority: https://www.fmcsa.dot.gov/registration/get-mc-number-authority-operate
- SAM.gov entity registration: https://sam.gov/entity-registration
- Grants.gov applicant registration: https://www.grants.gov/applicants/applicant-registration
- Wyoming Medicaid provider enrollment: https://health.wyo.gov/healthcarefin/medicaid/for-healthcare-providers/
- Google Workspace DKIM setup: https://knowledge.workspace.google.com/admin/security/set-up-dkim

## Next Steps

1. Commit this packet and the current document-control changes.
2. GitHub admin: set Pages source to GitHub Actions and custom domain to `viliganscommandcorp.com`.
3. DNS admin: replace website A/CNAME records with GitHub Pages records while preserving Google Workspace mail records.
4. CEO: approve Sheridan County / healthcare care-coordination planning selection or provide replacement county/category.
5. CEO/admin: verify SAM/UEI and Grants.gov status with private account access.
6. CEO/admin: generate Google DKIM in Admin console and provide only the public DNS TXT record for implementation.
7. CEO: approve the insurance quote request before any broker contact is sent.
