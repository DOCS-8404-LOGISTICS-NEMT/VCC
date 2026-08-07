# Gmail Packet Send Automation Control

Prepared: August 2, 2026

Company: VILIGANS COMMAND CORPORATION

Corporate sending identity: aldavis@viliganscommandcorp.com

Pilot: Wheatland / Platte County, Wyoming

Gmail labels created:

- `VCC/Wheatland Packet Queue`
- `VCC/Vehicle Funding Sprint`

Status: Draft-and-queue automation only. Do not send externally until recipient address, packet contents, claims, attachments, and CEO approval are confirmed.

## Purpose

Create a controlled Gmail workflow for sending Wheatland pilot packets to partners, sponsors, and public-sector contacts without making unapproved claims or sending to unverified recipients.

## Send Rules

1. Use Gmail drafts first.
2. Do not send any packet until the exact recipient email and organization are verified.
3. Do not send any packet until the selected packet type, subject, body, and attachments are approved.
4. Do not imply that VCC is already operating, insured, Medicaid-enrolled, WYDOT-authorized, or grant-certified.
5. Use one email thread per organization unless a known decision-maker requests copies to others.
6. Attach only review-cleared packet files.
7. Record the Gmail draft ID, sent timestamp, follow-up date, and response in the send queue.

## Approved Packet Sources For Drafting

| Packet | File | Use |
|---|---|---|
| Partner outreach packet | `output/docx/VCC_Partner_Outreach_Packet_DRAFT.docx` | Healthcare, county, senior, disability, workforce, VSO, and sponsor packet attachment after approval. |
| One-page Wheatland offer | `foundation/launch_package/27_Wheatland_One_Page_Pilot_Offer_2026-08-02.md` | Body language and discussion agenda. |
| Capability statement | `foundation/launch_package/02_Capability_Statement_DRAFT.md` | Capability summary language. |
| MOU framework | `foundation/launch_package/08_Partner_MOU_Template_DRAFT.md` | Follow-up attachment only after partner interest. |
| Funding and vehicle sprint | `foundation/launch_package/28_Seven_Day_Funding_And_Midmonth_Vehicle_Sprint_2026-08-02.md` | Internal support for sponsor/readiness-fee asks; do not attach externally without approval. |
| Vehicle / insurance / financing contact queue | `foundation/launch_package/34_Vehicle_Insurance_Financing_Contact_Queue_2026-08-02.csv` | Internal quote, funding, and authority call sequence; do not submit forms, applications, or quote requests without approval. |
| Vehicle funding close packet | `output/docx/VCC_Vehicle_Funding_Close_Packet_DRAFT.docx` | Sponsor/readiness, lender, vehicle, and CEO review packet after approval; do not attach externally without approval. |

## Segment Templates

### Healthcare Anchor

Subject: Wheatland rural transportation-access pilot discussion

Hello `[Name]`,

VILIGANS COMMAND CORPORATION is preparing a controlled Wheatland / Platte County transportation-access pilot for scheduled, non-emergency, non-ambulance trips.

We are looking for one healthcare anchor partner to help validate recurring access needs such as primary care, rehab, behavioral health, pharmacy access, follow-up appointments, and other essential services.

The pilot is still in readiness status. VCC will not launch public or paid passenger service until operating authority, insurance, vehicle, driver, safety, and privacy gates are complete.

Could we schedule a 20-minute planning call to discuss unmet transportation needs, referral workflow, a letter of support, a sponsor-funded ride block, or a readiness-fee pilot structure?

Respectfully,

Alawndus Davis  
VILIGANS COMMAND CORPORATION  
aldavis@viliganscommandcorp.com

### County / Public Health

Subject: Wheatland mobility-access planning request

Hello `[Name]`,

VILIGANS COMMAND CORPORATION is preparing a Wheatland / Platte County rural mobility pilot focused on scheduled, non-emergency access for seniors, individuals with disabilities, veterans, and residents who struggle to reach healthcare or essential services.

We are building the compliance package now and would like local input before any public launch. The goal is to identify priority routes, referral needs, reporting requirements, and possible local support.

Would your office be open to a 20-minute planning call?

Respectfully,

Alawndus Davis  
VILIGANS COMMAND CORPORATION  
aldavis@viliganscommandcorp.com

### Sponsor / Business Hub

Subject: Wheatland transportation-access sponsorship discussion

Hello `[Name]`,

VILIGANS COMMAND CORPORATION is preparing a controlled Wheatland / Platte County transportation-access pilot. We are seeking local sponsors for ride blocks, vehicle readiness, safety equipment, and launch reserve support.

Sponsors would receive impact reporting showing the number of rides supported, service areas reached, unmet transportation needs documented, and partner referrals generated after launch gates are complete.

Would your organization be open to reviewing a small sponsorship or ride-block packet?

Thank you,

Alawndus Davis  
VILIGANS COMMAND CORPORATION  
aldavis@viliganscommandcorp.com

## Automation Steps

1. Verify recipient email from the organization's official website or confirmed direct contact.
2. Add the verified email to `31_Gmail_Packet_Send_Queue_2026-08-02.csv`.
3. Select the segment template.
4. Create Gmail draft with approved subject/body and approved attachment.
5. Apply or track under Gmail label `VCC/Wheatland Packet Queue`.
6. CEO reviews the exact draft.
7. Send only after explicit final approval.
8. Log sent status and follow-up date.

## Replacement Draft Rule

If a generated packet changes after a Gmail draft is created, do not send the existing draft until the live Gmail attachment is rechecked.

Current sponsor-draft control:

- Do not send Chamber draft `r-3004465373696662663` because its vehicle close packet attachment is stale.
- Do not send Economic Development draft `r-154759076075875137` because its vehicle close packet attachment is stale.
- Use `53_Gmail_Draft_Attachment_Refresh_Audit_2026-08-02.md` and `54_Gmail_Replacement_Draft_Manifest_2026-08-02.md` before any replacement.
- Create replacement drafts only after CEO approval of the exact replacement recipient, subject, body, and attachment.
- Send replacement drafts only after separate CEO approval of the exact replacement draft IDs.

## Current Draft Batch

Nine verified-recipient packet drafts were created unsent on August 2, 2026 and labeled `VCC/Wheatland Packet Queue`.

Draft details are tracked in `33_Gmail_Recipient_Draft_Register_2026-08-02.csv`.

Current drafted targets:

- Platte County Public Health.
- Platte County Commissioners.
- Town of Wheatland.
- Platte County Emergency Management.
- Services for Seniors - Wheatland Main Office.
- Wyoming Veterans Commission - Platte/Laramie VSO.
- Wyoming Independent Living.
- Platte County Chamber of Commerce.
- Platte County Economic Development.

Two additional vehicle/funding sprint drafts were created unsent on August 2, 2026 and labeled `VCC/Vehicle Funding Sprint`.

Draft details are tracked in `35_Vehicle_Insurance_Financing_Draft_Register_2026-08-02.csv`.

Current drafted sprint targets:

- United Access for accessible van purchase, lease, or rental quote guidance.
- WyoMicro for Wyoming microloan and coaching-supported financing fit guidance.

Two funding-close sponsor/readiness drafts were created unsent on August 2, 2026 and labeled `VCC/Vehicle Funding Sprint`.

Draft details are tracked in `43_Gmail_Vehicle_Funding_Close_Draft_Register_2026-08-02.csv`.

Current drafted funding-close targets:

- Platte County Chamber of Commerce for vehicle-readiness sponsorship and local introductions.
- Platte County Economic Development for vehicle-readiness funding, sponsor introductions, and economic-development fit.

One WYDOT authority question draft was created unsent on August 2, 2026 and labeled `VCC/Vehicle Funding Sprint`.

Draft details are tracked in `45_Gmail_Authority_Draft_Register_2026-08-02.csv`.

Current drafted authority target:

- WYDOT Regulatory Section / Motor Vehicle Services for non-binding operating-authority questions.

## Follow-Up Cadence

| Day | Action |
|---:|---|
| 0 | Send approved packet. |
| 2 | Call the public office number or main line and ask for the correct planning contact. |
| 4 | Send a short follow-up if no response. |
| 7 | Move to phone-first or alternate contact path. |
| 14 | Close as waiting unless partner asks for more information. |

## No-Go Conditions

- Recipient address is not verified.
- Packet contains unapproved claims.
- Attachment is outdated.
- Gmail DKIM/SPF/DMARC status is not suitable for a larger send.
- The message implies active passenger service before launch gates clear.
- The message requests payment or creates a commitment without approved terms.
- The message requests a credit pull, quote submission, application, deposit, insurance bind, rental, lease, purchase, or authority filing before approval.
