import * as amplitude from "@amplitude/unified";
import { VCC_CONFIG, VCC_ANALYTICS_CONTEXT } from "./config.js";
import "./styles.css";

const INIT_FLAG = "__VCC_AMPLITUDE_INITIALIZED__";
const reviewDate = "August 2, 2026";

const app = document.querySelector("#app");

if (!app) {
  throw new Error("Vite application root #app was not found.");
}

const priorityActions = [
  {
    rank: 1,
    action: "Close seven-day funding sprint",
    owner: "Executive / Finance",
    due: "August 9, 2026",
    impact: 100,
    result:
      "Target $20k-$45k in near-term cash, sponsor pledges, readiness-fee commitments, or vehicle-financing approval for Wheatland launch readiness.",
  },
  {
    rank: 2,
    action: "Secure mid-month pilot vehicle path",
    owner: "Operations / Finance",
    due: "August 15, 2026",
    impact: 99,
    result:
      "Choose accessible van purchase, accessible rental/lease, or approved partner vehicle after insurance and authority screens.",
  },
  {
    rank: 3,
    action: "Submit ICAM eligibility decision package",
    owner: "Executive / Legal",
    due: "48 hours",
    impact: 98,
    result:
      "Decide direct applicant, subrecipient, or lead-partner route before the September 9, 2026 federal deadline.",
  },
  {
    rank: 4,
    action: "Confirm WYDOT transit funding path",
    owner: "Funding",
    due: "48 hours",
    impact: 97,
    result:
      "Confirm BlackCat access, coordinated plan status, match sources, and private operator role.",
  },
  {
    rank: 5,
    action: "Package first paid pilot offer",
    owner: "Growth",
    due: "5 days",
    impact: 95,
    result:
      "Prepare Wheatland / Platte County partner, clinic, employer, and sponsor offers with readiness fee and ride-block pricing.",
  },
  {
    rank: 6,
    action: "Build launch compliance binder",
    owner: "Operations",
    due: "10 days",
    impact: 90,
    result:
      "Good standing, operating authority, driver files, insurance, Medicaid path, ADA controls, and incident process.",
  },
];

const fundingPipeline = [
  {
    name: "FTA ICAM Pilot Program",
    type: "Federal grant",
    status: "Open",
    deadline: "September 9, 2026",
    amount: "$11.96M program",
    fit: "High",
    owner: "Grant lead",
    next: "Prepare 5310-aligned applicant path, partner letter list, match memo, vehicle/technology budget, and NEMT coordination narrative.",
    source:
      "https://www.transportation.gov/rural/grant-toolkit/innovative-coordinated-access-and-mobility-icam-pilot-program",
  },
  {
    name: "FHWA ATTAIN",
    type: "Federal grant",
    status: "Open",
    deadline: "August 11, 2026",
    amount: "$120M program",
    fit: "Selective",
    owner: "Partnership lead",
    next: "Only pursue through a government or transit technology partner if dispatch, access, or mobility-management scope can be filed quickly.",
    source:
      "https://www.transportation.gov/rural/grant-toolkit/advanced-transportation-technology-and-innovation-attain",
  },
  {
    name: "WYDOT 5310 / 5311 / 5339",
    type: "State-administered transit funding",
    status: "Prepare",
    deadline: "Confirm with WYDOT",
    amount: "Match-based",
    fit: "Critical",
    owner: "Funding lead",
    next: "Confirm 5310 senior/disability fit, 5311 rural operations fit, 5339 vehicle path, local match, and coordinated plan requirement.",
    source:
      "https://www.dot.state.wy.us/files/live/sites/wydot/files/shared/Planning/Local%20Government%20Coordination%20Office/WYDOT%20Application%20Guidelines%20Feb%202026.pdf",
  },
  {
    name: "Wheatland mobility pilot",
    type: "Service contract",
    status: "Revenue",
    deadline: "Rolling",
    amount: "$40k-$150k",
    fit: "Critical",
    owner: "Executive",
    next: "Offer Wheatland / Platte County 90-day readiness retainer plus trip reimbursement, weekly reports, and unmet-demand map.",
    source: VCC_CONFIG.website,
  },
  {
    name: "Clinic access agreements",
    type: "Service contract",
    status: "Revenue",
    deadline: "Rolling",
    amount: "$18k-$90k",
    fit: "High",
    owner: "Growth",
    next: "Pitch dialysis, rehab, behavioral health, pharmacy, discharge, and recurring appointment ride blocks.",
    source: VCC_CONFIG.website,
  },
  {
    name: "Community sponsorships",
    type: "Sponsorship",
    status: "Revenue",
    deadline: "Rolling",
    amount: "$15k-$75k",
    fit: "Medium",
    owner: "Marketing",
    next: "Sell sponsored ride days, vehicle wrap placement, outreach events, and sponsor impact reporting.",
    source: VCC_CONFIG.website,
  },
];

const dashboardCards = [
  {
    label: "Pilot Site",
    value: "Wheatland",
    detail: "Platte County launch test site selected for first service-boundary and partner-readiness work.",
  },
  {
    label: "7-Day Funding",
    value: "$20k-$45k",
    detail: "Immediate cash, pledge, readiness-fee, or vehicle-financing target by August 9, 2026.",
  },
  {
    label: "Vehicle Target",
    value: "Aug 15",
    detail: "Pilot vehicle possession target; paid service still waits for authority, insurance, driver, and policy gates.",
  },
  {
    label: "Immediate Revenue",
    value: "20 targets",
    detail: "Wheatland / Platte County outreach register prepared; approval required before contact.",
  },
  {
    label: "Grant Window",
    value: "38 days",
    detail: "ICAM window measured from August 2, 2026 to September 9, 2026.",
  },
  {
    label: "Launch Gate",
    value: "90 days",
    detail: "Pilot readiness plan with operating, vehicle, staffing, and reporting controls.",
  },
];

const proofGateCards = [
  {
    label: "Controlled Contact",
    status: "Needs exact CEO approval",
    detail:
      "Review 56_August_2_Public_Source_Refresh_2026-08-02.md, then use 55_CEO_Next_Action_Decision_Record_2026-08-02.md before any outside call, email, form, quote request, draft replacement, or sponsor approach.",
  },
  {
    label: "Vehicle Proof",
    status: "Missing",
    detail:
      "Count only written rental, lease, purchase, or partner-vehicle confirmation with timing, total due, permitted use, and vehicle class or VIN.",
  },
  {
    label: "Funding Proof",
    status: "Missing",
    detail:
      "Count only signed pledge, received funds, approved bridge authorization, lender/lease preapproval, or written term sheet.",
  },
  {
    label: "Launch Permission",
    status: "Not active",
    detail:
      "Paid passenger service remains held until authority, insurance, vehicle, driver, safety, privacy, and approval gates are complete.",
  },
];

const closeScorecard = [
  ["1", "WYDOT authority", "Source refreshed", "MC-100, Form E, USDOT, markings, and pre-authority limits still need WYDOT response"],
  ["2", "Insurance bindability", "Source refreshed", "Wyoming NEMT/livery eligibility, limits, driver rules, and Form E support still need broker response"],
  ["3", "Frontier rental bridge", "Source refreshed", "Cheyenne August 10-15 availability, total due, business-use rules, and insurance still need vendor response"],
  ["4", "MobilityWorks KR692569A", "Source refreshed", "Current availability, quote, title, inspection, warranty, and commercial-use permission still need vendor response"],
  ["5", "WyoMicro / sponsor funding", "Source refreshed", "Preliminary fit, sponsor readiness interest, pledge path, and written terms still need outside response"],
];

const workspaceReadiness = [
  {
    step: "Admin identity",
    status: "Verify",
    owner: "CEO / Admin",
    next: "Confirm aldavis@viliganscommandcorp.com has super-admin access and recovery options.",
  },
  {
    step: "Domain verification",
    status: "Partial",
    owner: "Admin",
    next: "Public DNS has Google verification; confirm Google Admin shows viliganscommandcorp.com as verified.",
  },
  {
    step: "Gmail routing",
    status: "Partial",
    owner: "Admin",
    next: "Public DNS has Google MX; confirm Gmail activation and mailbox send/receive tests.",
  },
  {
    step: "Sender authentication",
    status: "Review",
    owner: "Compliance",
    next: "Review SPF, generate Google DKIM, and confirm DMARC reports are monitored.",
  },
  {
    step: "Operating groups",
    status: "Draft",
    owner: "Operations",
    next: "Create groups for grants, legal, compliance, operations, partners, billing, and DMARC.",
  },
  {
    step: "Shared Drives",
    status: "Draft",
    owner: "Operations",
    next: "Create corporation-owned drives for governance, grants, contracts, compliance, assets, and finance.",
  },
  {
    step: "HIPAA/BAA guardrail",
    status: "Missing",
    owner: "Compliance / Counsel",
    next: "Do not store PHI or rider medical details until BAA and sharing controls are approved.",
  },
];

const workspaceDnsRecords = [
  ["Domain verification", "TXT", "@", "google-site-verification value present in DNS", "Confirm in Google Admin"],
  ["Gmail inbound mail", "MX", "@", "smtp.google.com, priority 1", "Confirm Gmail active"],
  ["SPF", "TXT", "@", "Current SPF uses a/mx plus BusinessIdentity sender", "Review before outreach"],
  ["DKIM", "TXT", "[selector]._domainkey", "Common selectors not found", "Generate/publish in Google Admin"],
  ["DMARC", "TXT", "_dmarc", "p=quarantine with BusinessIdentity reports", "Confirm report access"],
  ["Website", "A / CNAME", "@ and www", "Apex 66.223.49.89; www ghs.googlehosted.com", "Separate from mail changes"],
];

const workspaceGroups = [
  ["info@", "Public website and general inquiries"],
  ["grants@", "SAM.gov, Grants.gov, WYDOT, foundations, and funding partners"],
  ["legal@", "Governance, contracts, notices, filings, and legal review"],
  ["compliance@", "Insurance, WYDOT, Medicaid readiness, privacy, safety, incidents"],
  ["operations@", "Dispatch planning, vehicle readiness, staffing, and launch execution"],
  ["transportation@", "Transportation and mobility partner communications"],
  ["partners@", "Clinics, counties, VSOs, senior centers, sponsors, and employers"],
  ["billing@", "Invoices, sponsor payments, service contracts, and future claim workflow"],
  ["dmarc@", "Sender-authentication reports if not handled by an approved vendor"],
];

const workspaceDrives = [
  ["Corporate Governance", "Articles, good standing, bylaws, consents, stock ledger, annual reports"],
  ["Grants and Funding", "SAM, Grants.gov, NOFOs, budgets, narratives, submissions, awards"],
  ["Transportation Operations", "Authority, driver files, training, dispatch, trip logs, route plans"],
  ["Vehicles and Assets", "Titles, inspections, maintenance, insurance, equipment, asset ledger"],
  ["Insurance and Compliance", "Policies, COIs, claims, privacy, incidents, Medicaid readiness"],
  ["Contracts and Legal", "MOUs, service agreements, sponsorships, vendors, notices"],
  ["Marketing and Partnerships", "Capability statements, outreach lists, support letters, sponsor assets"],
  ["Finance and Investor Readiness", "Budgets, forecasts, lender packets, board approvals, funding sources"],
];

const workspaceSources = [
  {
    name: "Google Workspace domain verification",
    source:
      "https://knowledge.workspace.google.com/admin/domains/verify-your-domain-with-a-txt-record",
  },
  {
    name: "Google Workspace MX setup",
    source:
      "https://knowledge.workspace.google.com/admin/domains/set-up-mx-records-for-google-workspace",
  },
  {
    name: "Google Workspace SPF setup",
    source: "https://knowledge.workspace.google.com/admin/security/set-up-spf",
  },
  {
    name: "Google Workspace DMARC setup",
    source: "https://knowledge.workspace.google.com/admin/security/set-up-dmarc",
  },
  {
    name: "Google Workspace HIPAA implementation guide",
    source:
      "https://cloud.google.com/security/compliance/workspace_cloud_identity_hipaa_implementation_guide_workspace_whitepaper",
  },
];

const activeContracts = [
  {
    target: "Platte County health / human services",
    stage: "Draft offer",
    value: "$40k-$150k",
    decision: "Readiness retainer, trip reimbursement, and weekly pilot reporting.",
  },
  {
    target: "Clinics and hospitals",
    stage: "Prospecting",
    value: "$18k-$90k",
    decision: "Recurring appointment, discharge, dialysis, rehab, and pharmacy ride blocks.",
  },
  {
    target: "Employers and workforce boards",
    stage: "Prospecting",
    value: "$12k-$60k",
    decision: "Shift-aligned rural workforce transportation with attendance reporting.",
  },
  {
    target: "Sponsors and civic partners",
    stage: "Package",
    value: "$15k-$75k",
    decision: "Sponsored ride days, outreach events, vehicle wrap, and impact reports.",
  },
];

const complianceTasks = [
  {
    task: "Wyoming annual report and good standing",
    status: "Verify",
    owner: "Corporate",
    risk: "Loss of good standing blocks grants, financing, contracts, and insurance onboarding.",
    source: "https://wyobiz.wyo.gov/Business/AnnualReport.aspx",
  },
  {
    task: "WYDOT intrastate operating authority",
    status: "Legal review",
    owner: "Operations",
    risk: "Compensated passenger transportation can require operating authority and insurance filings.",
    source:
      "https://www.dot.state.wy.us/home/trucking_commercial_vehicles/operating_authority.html",
  },
  {
    task: "Commercial insurance bindability",
    status: "Quote",
    owner: "Legal / Finance",
    risk: "Coverage gaps can void launch readiness and financing approval.",
    source: VCC_CONFIG.website,
  },
  {
    task: "Wyoming Medicaid provider enrollment path",
    status: "Evaluate",
    owner: "Billing",
    risk: "No Medicaid billing until enrollment, taxonomy, provider agreement, and claims workflow are confirmed.",
    source:
      "https://health.wyo.gov/healthcarefin/medicaid/for-healthcare-providers/",
  },
  {
    task: "ADA and special-needs operating controls",
    status: "Draft",
    owner: "Operations",
    risk: "Overpromising accessibility before vehicle, securement, and training readiness creates legal exposure.",
    source:
      "https://www.transit.dot.gov/funding/grants/enhanced-mobility-seniors-individuals-disabilities-section-5310",
  },
];

const marketingTasks = [
  {
    channel: "Platte County decision-makers",
    message: "Reduce missed care and unmet transportation need.",
    next: "Send Wheatland one-page pilot offer and request work session.",
    metric: "2 county meetings",
  },
  {
    channel: "Clinics and hospitals",
    message: "Reliable recurring ride support for high-need patients.",
    next: "Schedule referral workflow call with care coordinators.",
    metric: "5 facility meetings",
  },
  {
    channel: "Employers",
    message: "Transportation support for attendance and workforce access.",
    next: "Pitch sponsored routes for rural shifts.",
    metric: "3 employer pilots",
  },
  {
    channel: "Community organizations",
    message: "Special-needs and rural mobility access for residents.",
    next: "Collect support letters and rider demand stories.",
    metric: "10 letters",
  },
];

const vehicleStatus = [
  {
    item: "Primary pilot vehicle acquisition",
    status: "Sprint",
    gate: "Accessible van purchase, accessible rental/lease, or approved partner vehicle after quote, inspection, insurance, and authority review.",
  },
  {
    item: "ADA-capable vehicle plan",
    status: "Spec",
    gate: "Lift or ramp, securement, safety equipment, maintenance file, and driver training.",
  },
  {
    item: "Backup transportation capacity",
    status: "Partner",
    gate: "MOUs with vetted providers for surge, maintenance downtime, and emergency continuity.",
  },
  {
    item: "Equipment kit",
    status: "Budget",
    gate: "Securement, first aid, communications, cleaning, signage, logs, and incident forms.",
  },
];

const grantCalendar = [
  {
    date: "August 1-3, 2026",
    milestone: "ICAM applicant route",
    output: "Eligibility memo and lead/subrecipient recommendation.",
  },
  {
    date: "August 4-8, 2026",
    milestone: "Partner letter sprint",
    output: "County, clinic, senior/disability, and transit support-letter requests.",
  },
  {
    date: "August 8-11, 2026",
    milestone: "ATTAIN decision",
    output: "Fast go/no-go with technology partner; file only if credible.",
  },
  {
    date: "August 12-23, 2026",
    milestone: "ICAM narrative and budget",
    output: "Coordination model, one-call/one-click path, vehicle budget, match plan.",
  },
  {
    date: "August 24-31, 2026",
    milestone: "Compliance and attachments",
    output: "SAM/UEI, corporate approvals, budget support, partner letters, risk controls.",
  },
  {
    date: "September 1-8, 2026",
    milestone: "Final ICAM review",
    output: "Executive signoff, legal review, final upload, and submission confirmation.",
  },
];

const requiredDocs = [
  ["Corporate good standing", "Legal", "Needed for grants, contracts, financing, and insurance."],
  ["Board/shareholder authorization", "Legal", "Authorize grant pursuit, contract negotiations, and acquisition limits."],
  ["SAM.gov / UEI profile", "Funding", "Required for federal grant activity and partner diligence."],
  ["Insurance quote package", "Finance", "Commercial auto, general liability, umbrella, physical damage, and driver standards."],
  ["Vehicle title and inspection file", "Operations", "VIN, title, lien, odometer, mechanical, safety, and accessibility checks."],
  ["Pilot budget and match memo", "Finance", "Grant match, operating deficit, sponsor revenue, and service contract assumptions."],
  ["Support letters and MOUs", "Growth", "County, health provider, senior/disability, employer, and civic partner validation."],
  ["Rider policy and incident process", "Operations", "Eligibility, assistance level, securement, complaints, emergencies, and records."],
];

const fundingDatabase = [
  {
    program: "FTA ICAM",
    use: "Mobility management, technology, one-call/one-click access, coordinated vehicles.",
    applicant: "5310-eligible recipients, operators, nonprofits, and some private-sector applicants.",
    match: "Generally 80%; ADA/Clean Air Act vehicle/equipment exceptions may improve federal share.",
  },
  {
    program: "WYDOT Section 5310",
    use: "Enhanced mobility for seniors and individuals with disabilities.",
    applicant: "Private nonprofit preferred; public bodies and approved coordinators may qualify.",
    match: "Traditional capital and nontraditional projects; local match required.",
  },
  {
    program: "WYDOT Section 5311",
    use: "Rural public transportation operations, administration, maintenance, planning, and capital.",
    applicant: "State/local government, private nonprofit, and limited commercial operator paths.",
    match: "Operating and capital ratios depend on category; confirm with WYDOT.",
  },
  {
    program: "WYDOT Section 5339",
    use: "Bus and bus facility capital, replacement, rehabilitation, and related equipment.",
    applicant: "Public entities, nonprofits, and public transportation operators.",
    match: "ADA vehicle path is more favorable than non-ADA vehicle path.",
  },
  {
    program: "Local service contracts",
    use: "Availability fee, ride reimbursement, sponsored blocks, and reporting deliverables.",
    applicant: "VCC directly as service provider after authority and insurance gates.",
    match: "Fastest cash path; can strengthen future match documentation.",
  },
];

const legalRepository = [
  {
    folder: "Corporate Governance",
    docs: "Bylaws, incorporator action, director/officer roster, shareholder ledger, S-election file, minutes, written consents.",
    gate: "Update before grants, debt, asset purchase, equity, or long-term service contract.",
  },
  {
    folder: "Contract Templates",
    docs: "Pilot services MSA, statement of work, referral MOU, sponsor agreement, subcontractor agreement, NDA.",
    gate: "Legal review before sending; no service promises beyond insured and authorized capacity.",
  },
  {
    folder: "Pilot Vehicle Acquisition",
    docs: "Purchase, lease, rental, or partner-vehicle agreement; title or authority to use; VIN file; inspection report; financing quote; insurance bindability memo.",
    gate: "No obligation until title, insurance, inspection, authority, and executive approval are complete.",
  },
  {
    folder: "Risk and Compliance",
    docs: "Operating authority analysis, Medicaid path, ADA policy, driver files, incident log, complaint log, maintenance ledger.",
    gate: "Required before public pilot launch or public grant claim of readiness.",
  },
];

const contractWorkflow = [
  ["Intake", "Business owner submits counterparty, scope, pricing, term, insurance requirements, and launch dependency."],
  ["Risk screen", "Legal tags regulated transport, Medicaid, special-needs, data/privacy, indemnity, financing, and exclusivity risks."],
  ["Financial review", "Finance checks margin, cash timing, match eligibility, billing proof, and termination exposure."],
  ["Executive approval", "Authorized signer receives summary, red flags, obligation cap, and go/no-go recommendation."],
  ["Execution and control", "Signed copy, renewal date, deliverables, insurance certificate, and operating owner are logged."],
];

const vehicleDocuments = [
  "Accessible van, rental, lease, or partner-vehicle source record",
  "Clean title or written use authority, VIN, odometer, lien release, and brand/salvage check when purchased or leased",
  "Independent mechanical, tire, brake, lift/ramp, securement, HVAC, and safety-equipment inspection",
  "Commercial-use classification memo tied to Wheatland scheduled passenger service",
  "Insurance quote and bindability confirmation before money changes hands",
  "Executive approval record with price ceiling, financing ceiling, signer, and final approval gate",
  "Asset ledger, mileage log, maintenance schedule, storage plan, and no-personal-use policy",
];

const riskTracker = [
  {
    risk: "Operating before authority and insurance are confirmed",
    severity: "High",
    mitigation: "Hold launch until WYDOT/FMCSA path, insurance filings, driver files, and vehicle inspection clear.",
  },
  {
    risk: "Grant ineligibility or weak applicant structure",
    severity: "High",
    mitigation: "Use partner/subrecipient route when direct eligibility is uncertain; document match and public benefit.",
  },
  {
    risk: "Vehicle used outside insured or approved purpose",
    severity: "High",
    mitigation: "Separate mobile outreach asset use from passenger transport unless specifically insured and authorized.",
  },
  {
    risk: "Medicaid billing before enrollment is complete",
    severity: "High",
    mitigation: "Do not bill Medicaid until provider enrollment, taxonomy, agreement, portal, and claim rules are verified.",
  },
  {
    risk: "Cash burn before revenue contracts",
    severity: "Medium",
    mitigation: "Tie purchase, hiring, and equipment decisions to signed pilot agreements, sponsor cash, or grant award path.",
  },
  {
    risk: "Overpromised accessibility",
    severity: "Medium",
    mitigation: "Publish only capabilities that match actual vehicle, securement, driver training, and assistance policies.",
  },
];

const campaignPlanner = [
  {
    campaign: "Wheatland pilot funding sprint",
    audience: "Platte County officials, public health, human services",
    offer: "90-day Wheatland rural mobility pilot with weekly impact dashboard",
    budget: "$750",
    kpi: "2 decision meetings",
  },
  {
    campaign: "Care-access partner drive",
    audience: "Clinics, hospitals, dialysis, rehab",
    offer: "Ride block and referral workflow for recurring high-need trips",
    budget: "$500",
    kpi: "5 provider calls",
  },
  {
    campaign: "Sponsor-a-ride launch",
    audience: "Banks, utilities, employers, civic groups",
    offer: "Branded ride days, outreach events, and public impact recap",
    budget: "$350",
    kpi: "$15k pledged",
  },
  {
    campaign: "Rider validation campaign",
    audience: "Seniors, disability advocates, veterans, caregivers",
    offer: "Needs survey, listening sessions, and support-letter drive",
    budget: "$250",
    kpi: "50 demand records",
  },
];

const outreachTracker = [
  ["WYDOT Transit staff", "Funding alignment", "Call and document 5310/5311/5339 path", "This week"],
  ["Platte County commissioners", "Pilot buyer", "Request Wheatland work session and sponsor letter", "This week"],
  ["Platte County Public Health", "Demand validation", "Collect trip categories and unmet-need data", "This week"],
  ["Platte County Hospital / clinic care coordinators", "Referral channel", "Map recurring ride workflows", "Next 10 days"],
  ["Senior/disability organizations", "Support letters", "Host listening session and survey", "Next 14 days"],
  ["Employers/chamber", "Revenue partner", "Pitch workforce access route support", "Next 21 days"],
];

const partnershipPipeline = [
  {
    partner: "WYDOT Transit",
    value: "Grant eligibility, BlackCat, match, coordinated plan, public transit alignment.",
    ask: "Confirm best funding path and private operator role.",
  },
  {
    partner: "County government",
    value: "Local match, pilot contract, public need validation, launch credibility.",
    ask: "Approve 90-day pilot work session and support letter.",
  },
  {
    partner: "Healthcare providers",
    value: "Recurring trips, referrals, discharge planning, care access metrics.",
    ask: "Pilot referral workflow and monthly ride block.",
  },
  {
    partner: "Senior/disability advocates",
    value: "Rider needs, ADA controls, demand proof, support letters.",
    ask: "Needs survey, listening session, and advisory role.",
  },
  {
    partner: "Employers and workforce boards",
    value: "Workforce transportation revenue and economic development case.",
    ask: "Sponsor shift-aligned rural ride pilot.",
  },
];

const socialCalendar = [
  ["Week 1", "Problem", "Rural residents miss care when transportation fails.", "LinkedIn, Facebook"],
  ["Week 2", "Solution", "VCC is building a Wyoming special-needs mobility pilot.", "Website, email"],
  ["Week 3", "Partner ask", "Invite clinics, counties, employers, and civic groups to sponsor ride access.", "LinkedIn, direct"],
  ["Week 4", "Proof", "Publish demand survey themes and support-letter count.", "Facebook, newsletter"],
  ["Week 5", "Funding", "Explain grant and match plan without implying award certainty.", "LinkedIn"],
  ["Week 6", "Launch readiness", "Show safety, driver, vehicle, and compliance gates.", "Website, email"],
];

const launchPlan = [
  {
    phase: "Days 1-15",
    priority: 99,
    task: "Funding and applicant path",
    output: "ICAM route, WYDOT call notes, grant calendar, match memo, and partner list.",
  },
  {
    phase: "Days 1-15",
    priority: 97,
    task: "Corporate and legal readiness",
    output: "Good standing, board authority, bylaws folder, contract workflow, and obligation gate.",
  },
  {
    phase: "Days 10-30",
    priority: 95,
    task: "Revenue pipeline launch",
    output: "Wheatland / Platte County partner, clinic, employer, and sponsor proposals sent with meeting tracker.",
  },
  {
    phase: "Days 15-45",
    priority: 93,
    task: "Pilot vehicle acquisition decision",
    output: "Accessible vehicle or partner-capacity file, inspection, insurance quote, financing options, and approval record.",
  },
  {
    phase: "Days 30-60",
    priority: 90,
    task: "Operations buildout",
    output: "Dispatch workflow, driver files, rider policy, incident process, maintenance log, and training plan.",
  },
  {
    phase: "Days 60-90",
    priority: 86,
    task: "Controlled launch and reporting",
    output: "Soft launch, weekly metrics, cost per trip, unmet demand log, and next-funding report.",
  },
];

const wyomingChecklist = [
  "Wyoming Secretary of State good standing and annual report date verified.",
  "Registered agent and corporate officer/director records current.",
  "WYDOT operating authority and insurance filing requirements reviewed.",
  "USDOT/FMCSA status confirmed if vehicle/service model triggers federal requirements.",
  "Commercial auto, general liability, umbrella, physical damage, and driver coverage quoted.",
  "Wyoming Medicaid provider enrollment and billing path evaluated before any Medicaid claim.",
  "Grant match sources documented and not double-counted.",
  "Contracts signed only by authorized corporate officer after legal review.",
];

const nemtChecklist = [
  "Service scope distinguishes NEMT, public transit, private contract rides, and community outreach.",
  "Driver qualification file, license check, background path, training, and drug/alcohol policy decision.",
  "Rider intake, eligibility, assistance level, caregiver rules, service animal policy, and complaint process.",
  "Trip scheduling, dispatch, no-show, cancellation, documentation, and incident workflows.",
  "HIPAA/privacy exposure review for referral, scheduling, and reporting workflows.",
  "Vehicle inspection, maintenance, sanitation, securement, and emergency supply logs.",
  "Billing controls for contract, grant, sponsor, and Medicaid-related revenue streams.",
  "Weekly launch dashboard for trips, denials, cost per trip, revenue, safety, and partner referrals.",
];

const equipmentRequirements = [
  ["ADA-capable van or compliant partner capacity", "Launch-critical", "Lift/ramp, securement, door clearance, interior condition, and maintenance records."],
  ["Dispatch and routing stack", "Launch-critical", "Phone, shared inbox, trip log, route planning, incident flags, and weekly reporting."],
  ["Vehicle safety kit", "Launch-critical", "First aid, fire extinguisher, spill kit, PPE, reflective triangles, flashlight, and communication backup."],
  ["Brand and rider materials", "Revenue", "Capability statement, one-page pilot offer, rider card, vehicle signage, and sponsor packet."],
  ["Compliance binder", "Launch-critical", "Corporate records, insurance, operating authority, driver files, policies, inspections, and contract approvals."],
];

const budgetProjection = [
  {
    line: "Pilot vehicle acquisition, lease, or rental",
    low: "$35k",
    high: "$120k",
    note: "Use financing only after title, inspection, insurance, and corporate approval gates.",
  },
  {
    line: "Insurance and authority startup",
    low: "$8k",
    high: "$28k",
    note: "Commercial auto, liability, umbrella, filings, and broker review.",
  },
  {
    line: "Driver and dispatch staffing",
    low: "$22k",
    high: "$75k",
    note: "Pilot staffing, training, background checks, and scheduling coverage.",
  },
  {
    line: "Equipment, technology, and compliance",
    low: "$12k",
    high: "$48k",
    note: "Securement, communications, logs, software, marketing, and rider materials.",
  },
  {
    line: "90-day revenue target",
    low: "$85k",
    high: "$375k",
    note: "County contract, clinic ride blocks, employer support, sponsorships, and grant planning.",
  },
];

function statusClass(status) {
  return status.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function card(title, body, meta = "") {
  return `
    <article class="card">
      <h3>${title}</h3>
      <p>${body}</p>
      ${meta ? `<p class="card-meta">${meta}</p>` : ""}
    </article>
  `;
}

function table(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function sourceLink(item, label = "Source") {
  return `<a href="${item.source}" target="_blank" rel="noreferrer" data-vcc-event="VCC Source Opened" data-label="${item.name || item.task || item.program || label}">${label}</a>`;
}

function renderPriorityActions() {
  return priorityActions
    .map(
      (item) => `
        <article class="action-item">
          <span class="rank">${item.rank}</span>
          <div>
            <div class="row-heading">
              <h3>${item.action}</h3>
              <span class="impact">Impact ${item.impact}/100</span>
            </div>
            <p>${item.result}</p>
            <p class="card-meta">Owner: ${item.owner} | Due: ${item.due}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderFundingRows(items = fundingPipeline) {
  return items.map((item) => [
    `<a href="${item.source}" target="_blank" rel="noreferrer" data-vcc-event="VCC Funding Opportunity Viewed" data-label="${item.name}">${item.name}</a>`,
    item.type,
    `<span class="pill ${statusClass(item.status)}">${item.status}</span>`,
    item.deadline,
    item.amount,
    item.fit,
    item.next,
  ]);
}

function renderChecklist(items) {
  return `
    <ul class="checklist">
      ${items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function renderCommandIntro(kicker, title, body) {
  return `
    <div class="section-heading">
      <div>
        <p class="eyebrow">${kicker}</p>
        <h2>${title}</h2>
      </div>
      <p class="section-summary">${body}</p>
    </div>
  `;
}

function track(eventName, properties = {}) {
  amplitude.track(eventName, {
    ...VCC_ANALYTICS_CONTEXT,
    page_title: document.title,
    page_path: window.location.pathname,
    review_date: reviewDate,
    ...properties,
  });
}

app.innerHTML = `
  <main>
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">Executive Operations Workspace | ${reviewDate}</p>
      <h1 id="page-title">${VCC_CONFIG.company}</h1>
      <p class="lead">
        ${VCC_CONFIG.division} command workspace for funding, legal control, contract revenue,
        rural special-needs mobility readiness, NEMT preparation, marketing execution, and the first Wyoming pilot.
      </p>
      <div class="identity-grid">
        <div><span>Corporate email</span><strong>${VCC_CONFIG.corporateEmail}</strong></div>
        <div><span>Website</span><strong>${VCC_CONFIG.website}</strong></div>
        <div><span>Launch objective</span><strong>Funded Wyoming pilot</strong></div>
        <div><span>Legal posture</span><strong>No obligation without approval</strong></div>
      </div>
      <nav class="command-nav" aria-label="Command centers">
        <a href="#executive" data-vcc-event="VCC Command Center Opened" data-label="Executive Dashboard">Executive</a>
        <a href="#workspace" data-vcc-event="VCC Command Center Opened" data-label="Google Workspace Foundation">Workspace</a>
        <a href="#grants" data-vcc-event="VCC Command Center Opened" data-label="Grant Command Center">Grants</a>
        <a href="#legal" data-vcc-event="VCC Command Center Opened" data-label="Legal Contract Center">Legal</a>
        <a href="#marketing" data-vcc-event="VCC Command Center Opened" data-label="Marketing Growth Center">Growth</a>
        <a href="#pilot" data-vcc-event="VCC Command Center Opened" data-label="Pilot Launch Command Center">Pilot</a>
      </nav>
      <div class="button-row">
        <a href="${VCC_CONFIG.website}" data-vcc-event="VCC Website Clicked" data-label="Company Website">Company Website</a>
        <a href="mailto:${VCC_CONFIG.corporateEmail}" data-vcc-event="VCC Contact Intent" data-label="Email VCC">Email VCC</a>
        <button type="button" data-vcc-event="VCC Funding Interest" data-label="Funding action">Track Funding Interest</button>
        <button type="button" data-vcc-event="VCC Service Area Interest" data-label="Service area action">Track Service Area Interest</button>
      </div>
    </section>

    <section id="workspace" aria-labelledby="workspace-title">
      ${renderCommandIntro(
        "0. Google Workspace Foundation",
        "Domain, Gmail, sender security, role groups, Shared Drives, and PHI guardrails",
        "VCC should operate Workspace under aldavis@viliganscommandcorp.com while keeping DNS changes, admin changes, and medical-adjacent data controls behind approval gates.",
      )}
      <div class="notice">
        Workspace setup is an operating-control project. Do not change MX, SPF, DKIM, DMARC, admin roles, sharing rules,
        or PHI storage practices without CEO approval and a rollback plan.
      </div>
      <h3 class="block-title">Readiness tracker</h3>
      ${table(
        ["Step", "Status", "Owner", "Next action"],
        workspaceReadiness.map((item) => [
          item.step,
          `<span class="pill ${statusClass(item.status)}">${item.status}</span>`,
          item.owner,
          item.next,
        ]),
      )}
      <h3 class="block-title">DNS and mail controls</h3>
      ${table(["Control", "Type", "Host", "Current / target", "Action"], workspaceDnsRecords)}
      <div class="grid two">
        <div>
          <h3 class="block-title">Operating groups</h3>
          ${table(["Address", "Use"], workspaceGroups)}
        </div>
        <div>
          <h3 class="block-title">Shared Drive map</h3>
          ${table(["Drive", "Records"], workspaceDrives)}
        </div>
      </div>
    </section>

    <section id="executive" aria-labelledby="executive-title">
      ${renderCommandIntro(
        "1. Executive Dashboard",
        "Funding, contracts, compliance, marketing, and pilot vehicle readiness",
        "Priority is cash, authority to operate, launch-safe vehicle capacity, and documented grant readiness.",
      )}
      <div class="metric-grid">
        ${dashboardCards
          .map(
            (item) => `
              <article class="metric-card">
                <span>${item.label}</span>
                <strong>${item.value}</strong>
                <p>${item.detail}</p>
              </article>
            `,
          )
          .join("")}
      </div>
      <h3 class="block-title">Immediate actions ranked by impact</h3>
      <div class="action-list">${renderPriorityActions()}</div>
      <div class="notice strong">
        Current close status: the August 9 funding and August 15 vehicle goals remain possible but unproven. The next evidence-producing step is controlled contact for quote, fit, timing, and planning information only.
      </div>
      <div class="grid four proof-grid">
        ${proofGateCards
          .map(
            (item) => `
              <article class="card proof-card">
                <span class="pill ${statusClass(item.status)}">${item.status}</span>
                <h3>${item.label}</h3>
                <p>${item.detail}</p>
              </article>
            `,
          )
          .join("")}
      </div>
      <h3 class="block-title">Proof intake scorecard</h3>
      ${table(["Priority", "Lane", "Status", "Proof required"], closeScorecard)}
      <div class="split">
        <div>
          <h3 class="block-title">Funding pipeline</h3>
          ${table(
            ["Opportunity", "Type", "Status", "Deadline", "Amount", "Fit", "Next action"],
            renderFundingRows(fundingPipeline.slice(0, 4)),
          )}
        </div>
        <div>
          <h3 class="block-title">Pilot vehicle acquisition status</h3>
          <div class="stacked-list">
            ${vehicleStatus
              .map(
                (item) => `
                  <article>
                    <span class="pill ${statusClass(item.status)}">${item.status}</span>
                    <h4>${item.item}</h4>
                    <p>${item.gate}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
      </div>
      <div class="grid two">
        <div>
          <h3 class="block-title">Active contracts</h3>
          ${table(
            ["Target", "Stage", "Value", "Decision point"],
            activeContracts.map((item) => [item.target, item.stage, item.value, item.decision]),
          )}
        </div>
        <div>
          <h3 class="block-title">Marketing tasks</h3>
          ${table(
            ["Channel", "Message", "Next action", "Metric"],
            marketingTasks.map((item) => [item.channel, item.message, item.next, item.metric]),
          )}
        </div>
      </div>
    </section>

    <section id="grants" aria-labelledby="grants-title">
      ${renderCommandIntro(
        "2. Grant Command Center",
        "Grant tracker, application calendar, document checklist, and opportunity database",
        "Current funding strategy pairs immediate earned revenue with ICAM, WYDOT transit funding, and selective ATTAIN participation.",
      )}
      <h3 class="block-title">Grant tracker</h3>
      ${table(
        ["Opportunity", "Type", "Status", "Deadline", "Amount", "Fit", "Next action"],
        renderFundingRows(),
      )}
      <div class="grid two">
        <div>
          <h3 class="block-title">Application calendar</h3>
          <div class="timeline">
            ${grantCalendar
              .map(
                (item) => `
                  <article class="timeline-item">
                    <span>${item.date}</span>
                    <h4>${item.milestone}</h4>
                    <p>${item.output}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div>
          <h3 class="block-title">Required documents checklist</h3>
          ${table(
            ["Document", "Owner", "Use"],
            requiredDocs.map(([doc, owner, use]) => [doc, owner, use]),
          )}
        </div>
      </div>
      <h3 class="block-title">Funding opportunity database</h3>
      <div class="grid three">
        ${fundingDatabase
          .map(
            (item) => `
              <article class="card">
                <h3>${item.program}</h3>
                <p>${item.use}</p>
                <p class="card-meta">Applicant: ${item.applicant}</p>
                <p class="card-meta">Match: ${item.match}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>

    <section id="legal" aria-labelledby="legal-title">
      ${renderCommandIntro(
        "3. Legal & Contract Center",
        "Bylaws repository, contract workflow, pilot vehicle acquisition file, and risk tracker",
        "This center prevents unfunded, uninsured, unauthorized, or misclassified obligations before pilot launch.",
      )}
      <div class="notice">
        Executive control: VCC should not create a legal, financial, contractual, regulatory, or ownership obligation
        until authorized corporate approval, insurance bindability, and operating-use review are complete.
      </div>
      <h3 class="block-title">Corporate bylaws repository</h3>
      <div class="grid four">
        ${legalRepository
          .map((item) => card(item.folder, item.docs, `Gate: ${item.gate}`))
          .join("")}
      </div>
      <div class="grid two">
        <div>
          <h3 class="block-title">Contract review workflow</h3>
          <ol class="numbered">
            ${contractWorkflow.map(([step, detail]) => `<li><strong>${step}:</strong> ${detail}</li>`).join("")}
          </ol>
        </div>
        <div>
          <h3 class="block-title">Pilot vehicle acquisition documents</h3>
          ${renderChecklist(vehicleDocuments)}
        </div>
      </div>
      <h3 class="block-title">Risk assessment tracker</h3>
      ${table(
        ["Risk", "Severity", "Mitigation"],
        riskTracker.map((item) => [
          item.risk,
          `<span class="pill ${statusClass(item.severity)}">${item.severity}</span>`,
          item.mitigation,
        ]),
      )}
    </section>

    <section id="marketing" aria-labelledby="marketing-title">
      ${renderCommandIntro(
        "4. Marketing & Growth Center",
        "Ad campaign planner, outreach tracker, partnership pipeline, and content calendar",
        "Growth work is tied to signed service revenue, grant support letters, local match, and rider demand validation.",
      )}
      <h3 class="block-title">Ad campaign planner</h3>
      ${table(
        ["Campaign", "Audience", "Offer", "Budget", "KPI"],
        campaignPlanner.map((item) => [item.campaign, item.audience, item.offer, item.budget, item.kpi]),
      )}
      <div class="grid two">
        <div>
          <h3 class="block-title">Community outreach tracker</h3>
          ${table(["Target", "Purpose", "Next action", "Timing"], outreachTracker)}
        </div>
        <div>
          <h3 class="block-title">Partnership pipeline</h3>
          <div class="stacked-list">
            ${partnershipPipeline
              .map(
                (item) => `
                  <article>
                    <h4>${item.partner}</h4>
                    <p>${item.value}</p>
                    <p class="card-meta">Ask: ${item.ask}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
      </div>
      <h3 class="block-title">Social media content calendar</h3>
      ${table(["Week", "Theme", "Post angle", "Channel"], socialCalendar)}
    </section>

    <section id="pilot" aria-labelledby="pilot-title">
      ${renderCommandIntro(
        "5. Pilot Launch Command Center",
        "90-day launch plan, Wyoming compliance, NEMT readiness, vehicle requirements, and projections",
        "The pilot should launch only after funding path, contract revenue, authority, insurance, vehicle, driver, and reporting gates are ready.",
      )}
      <h3 class="block-title">90-day launch plan ranked by priority</h3>
      <div class="timeline wide">
        ${launchPlan
          .map(
            (item) => `
              <article class="timeline-item">
                <span>${item.phase}</span>
                <h4>${item.task}</h4>
                <p>${item.output}</p>
                <strong>Priority ${item.priority}/100</strong>
              </article>
            `,
          )
          .join("")}
      </div>
      <div class="grid two">
        <div>
          <h3 class="block-title">Wyoming compliance checklist</h3>
          ${renderChecklist(wyomingChecklist)}
        </div>
        <div>
          <h3 class="block-title">NEMT readiness checklist</h3>
          ${renderChecklist(nemtChecklist)}
        </div>
      </div>
      <h3 class="block-title">Vehicle and equipment requirements</h3>
      ${table(
        ["Requirement", "Priority", "Standard"],
        equipmentRequirements.map(([requirement, priority, standard]) => [
          requirement,
          `<span class="pill ${statusClass(priority)}">${priority}</span>`,
          standard,
        ]),
      )}
      <h3 class="block-title">Budget and revenue projections</h3>
      ${table(
        ["Line item", "Low", "High", "Control note"],
        budgetProjection.map((item) => [item.line, item.low, item.high, item.note]),
      )}
    </section>

    <section aria-labelledby="source-title">
      ${renderCommandIntro(
        "Source-backed operating references",
        "Verified references used for the August 2, 2026 workspace",
        "Final decisions still require current agency guidance, insurer review, and Wyoming counsel before VCC signs or files anything.",
      )}
      <div class="grid three">
        ${card("ICAM", "Open federal funding opportunity for coordinated transportation and NEMT access.", sourceLink(fundingPipeline[0]))}
        ${card("ATTAIN", "Open technology funding opportunity; use only with a credible eligible partner.", sourceLink(fundingPipeline[1]))}
        ${card("WYDOT transit guidance", "Wyoming 5310, 5311, 5339, match, eligibility, and planning guidance.", sourceLink(fundingPipeline[2]))}
        ${card("Wyoming annual report", "Good standing and annual report due-date verification.", sourceLink(complianceTasks[0]))}
        ${card("WYDOT operating authority", "Intrastate authority and insurance filing reference.", sourceLink(complianceTasks[1]))}
        ${card("Wyoming Medicaid", "Provider enrollment and billing path reference.", sourceLink(complianceTasks[3]))}
        ${workspaceSources
          .map((item) => card(item.name, "Google Workspace setup and compliance reference.", sourceLink(item)))
          .join("")}
      </div>
    </section>
  </main>
`;

if (!window[INIT_FLAG]) {
  amplitude.initAll(VCC_CONFIG.amplitude.apiKey, {
    analytics: { autocapture: VCC_CONFIG.amplitude.autocapture },
    sessionReplay: {
      sampleRate: VCC_CONFIG.amplitude.sessionReplaySampleRate,
    },
  });

  window[INIT_FLAG] = true;
  track("VCC Page Viewed");
}

document.querySelectorAll("[data-vcc-event]").forEach((element) => {
  element.addEventListener("click", () => {
    track(element.dataset.vccEvent, {
      label: element.dataset.label || element.textContent.trim(),
      href: element.getAttribute("href") || undefined,
    });
  });
});
