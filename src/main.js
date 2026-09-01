import * as amplitude from "@amplitude/unified";
import { VCC_CONFIG, VCC_ANALYTICS_CONTEXT } from "./config.js";
import "./styles.css";

const INIT_FLAG = "__VCC_AMPLITUDE_INITIALIZED__";
const reviewDate = "July 30, 2026";
const PLATTE_COUNTY_QUESTIONNAIRE_URL = "https://form.typeform.com/to/zItkYeCT";

const app = document.querySelector("#app");

if (!app) {
  throw new Error("Vite application root #app was not found.");
}

const fundingOpportunities = [
  {
    name: "FTA ICAM Pilot Program",
    status: "Open",
    deadline: "September 9, 2026",
    fit: "High",
    action:
      "Confirm whether VCC qualifies directly as an operator or should file through a Wyoming public/nonprofit partner.",
    note:
      "Capital funding for coordination technology, mobility management, one-call/one-click access, vehicles, and NEMT coordination.",
    url: "https://www.transportation.gov/rural/grant-toolkit/innovative-coordinated-access-and-mobility-icam-pilot-program",
  },
  {
    name: "FHWA ATTAIN",
    status: "Open",
    deadline: "August 11, 2026",
    fit: "Selective",
    action:
      "Use only if VCC can join a fast government/transit technology proposal for access, dispatch, or mobility management.",
    note:
      "Competitive advanced transportation technology funding with a rural set-aside and match requirement.",
    url: "https://www.transportation.gov/rural/grant-toolkit/advanced-transportation-technology-and-innovation-attain",
  },
  {
    name: "WYDOT 5310 / 5311 / 5339 Transit Path",
    status: "Prepare",
    deadline: "Confirm with WYDOT",
    fit: "Critical",
    action:
      "Call WYDOT Transit staff, confirm BlackCat access, coordinated plan requirements, match, and vehicle funding pathway.",
    note:
      "Best Wyoming-aligned route for rural transit, senior/disability mobility, public transportation operations, and vehicle capital.",
    url: "https://www.dot.state.wy.us/files/live/sites/wydot/files/shared/Planning/Local%20Government%20Coordination%20Office/WYDOT%20Application%20Guidelines%20Feb%202026.pdf",
  },
  {
    name: "Clinic / county pilot service agreements",
    status: "Revenue",
    deadline: "Rolling",
    fit: "Critical",
    action:
      "Pitch a 90-day paid pilot with fixed monthly readiness fee plus trip reimbursement or sponsored ride blocks.",
    note:
      "Fastest path to non-dilutive revenue while grant applications mature.",
    url: VCC_CONFIG.website,
  },
];

const immediateActions = [
  {
    title: "Decide ICAM applicant strategy",
    owner: "Executive / Legal",
    impact: 98,
    due: "48 hours",
    detail:
      "Determine direct eligibility, eligible subrecipient path, or lead partner before the September 9 federal deadline.",
  },
  {
    title: "Call WYDOT Transit and confirm BlackCat path",
    owner: "Funding",
    impact: 96,
    due: "48 hours",
    detail:
      "Ask about 5310, 5311, 5339, Transportation Enterprise Fund, coordinated plan status, match, and private operator role.",
  },
  {
    title: "Lock vehicle readiness stop/go gate",
    owner: "Operations / Legal",
    impact: 94,
    due: "72 hours",
    detail:
      "No public service launch until vehicle inspection, insurance bindability, operating authority, driver files, and executive consent are complete.",
  },
  {
    title: "Package first revenue offer",
    owner: "Growth",
    impact: 91,
    due: "5 days",
    detail:
      "Create clinic, county, employer, and sponsor offers around missed-care reduction, disability mobility, workforce access, and community outreach days.",
  },
  {
    title: "Finish compliance readiness file",
    owner: "Operations",
    impact: 89,
    due: "7 days",
    detail:
      "Good standing, annual report month, registered agent, insurance, driver files, operating authority, Medicaid enrollment, and incident reporting.",
  },
];

const complianceTasks = [
  {
    title: "Wyoming annual report and good standing",
    requirement:
      "Annual report due the first day of the anniversary month of formation; confirm filing ID and current good standing.",
    risk: "Loss of good standing blocks grants, contracts, financing, and insurance onboarding.",
    url: "https://wyobiz.wyo.gov/Business/AnnualReport.aspx",
  },
  {
    title: "WYDOT operating authority review",
    requirement:
      "Confirm whether compensated intrastate passenger transportation requires MC-100 authority, Form E filing, and USDOT number.",
    risk: "Operating before authority and insurance can create enforcement, contract, and coverage risk.",
    url: "https://www.dot.state.wy.us/home/trucking_commercial_vehicles/operating_authority.html",
  },
  {
    title: "Wyoming Medicaid enrollment and billing path",
    requirement:
      "Do not bill Medicaid until provider enrollment, portal access, electronic claims, and service rules are confirmed.",
    risk: "Improper claims can trigger denials, repayment, exclusion, or audit exposure.",
    url: "https://health.wyo.gov/healthcarefin/medicaid/for-healthcare-providers/",
  },
  {
    title: "ADA and special-needs service controls",
    requirement:
      "Define accessibility capacity, rider assistance, securement, service animal policy, complaint handling, and staff training.",
    risk: "Overpromising accessible transport before vehicle and training readiness creates civil rights and safety exposure.",
    url: "https://www.transit.dot.gov/funding/grants/enhanced-mobility-seniors-individuals-disabilities-section-5310",
  },
];

const revenueOpportunities = [
  {
    name: "County mobility pilot",
    target: "$40k-$150k",
    next: "Present 90-day pilot scope, reporting cadence, and fixed monthly availability fee.",
  },
  {
    name: "Clinic and hospital access contracts",
    target: "$18k-$90k",
    next: "Pitch recurring appointment, discharge ride, dialysis, rehab, and behavioral health transportation support.",
  },
  {
    name: "Employer-sponsored rural workforce rides",
    target: "$12k-$60k",
    next: "Offer shift-aligned transportation support for hiring, attendance, and rural workforce access.",
  },
  {
    name: "Local sponsorship packages",
    target: "$15k-$75k",
    next: "Sell ride blocks, vehicle wrap placement, community outreach days, and sponsor reporting.",
  },
];

const partnerPipeline = [
  "WYDOT Transit staff for grant eligibility, BlackCat, 5310/5311/5339, match, and coordinated plan alignment.",
  "County commissioners, county public health, and human services for pilot endorsement and local match.",
  "Hospitals, clinics, dialysis centers, behavioral health, rehab, and pharmacies for paid ride-referral workflows.",
  "Senior centers, disability advocates, veterans organizations, churches, and civic groups for rider validation and support letters.",
  "Employers, workforce boards, and chambers of commerce for sponsored access-to-work transportation.",
];

const launchPlan = [
  {
    phase: "Days 1-15",
    task: "Funding eligibility and partner path",
    impact: 99,
    output: "ICAM/WYDOT applicant decision, lead partner list, and grant calendar.",
  },
  {
    phase: "Days 1-15",
    task: "Compliance operating map",
    impact: 97,
    output: "Wyoming authority, Medicaid, insurance, driver, and ADA checklist with owners.",
  },
  {
    phase: "Days 1-30",
    task: "Vehicle readiness and insurance",
    impact: 94,
    output: "Vehicle inspection standard, commercial coverage quote, driver file checklist, and launch consent gate.",
  },
  {
    phase: "Days 15-45",
    task: "Revenue pipeline launch",
    impact: 92,
    output: "Clinic, county, employer, and sponsor pitch sheets with meeting tracker.",
  },
  {
    phase: "Days 30-60",
    task: "Operations buildout",
    impact: 88,
    output: "Dispatch workflow, driver files, vehicle inspection plan, rider policy, and incident process.",
  },
  {
    phase: "Days 60-90",
    task: "Controlled pilot and reporting cadence",
    impact: 84,
    output: "Soft launch, weekly metrics, cost per trip, unmet demand log, and funding gap report.",
  },
];

function card(title, body, meta = "") {
  return `
    <article class="card">
      <h3>${title}</h3>
      <p>${body}</p>
      ${meta ? `<p class="card-meta">${meta}</p>` : ""}
    </article>
  `;
}

function opportunityRows() {
  return fundingOpportunities
    .map(
      (item) => `
        <tr>
          <td><a href="${item.url}" target="_blank" rel="noreferrer">${item.name}</a></td>
          <td><span class="pill">${item.status}</span></td>
          <td>${item.deadline}</td>
          <td>${item.fit}</td>
          <td>${item.action}</td>
        </tr>
      `,
    )
    .join("");
}

let analyticsReady = false;

function track(eventName, properties = {}) {
  if (!analyticsReady) return;

  amplitude.track(eventName, {
    ...VCC_ANALYTICS_CONTEXT,
    page_title: document.title,
    page_path: window.location.pathname,
    review_date: reviewDate,
    ...properties,
  });
}

async function initializeAmplitude() {
  if (window[INIT_FLAG]) {
    analyticsReady = Boolean(await window[INIT_FLAG]);
    return analyticsReady;
  }

  if (!VCC_CONFIG.amplitude.apiKey) {
    console.warn("Amplitude is disabled: VITE_AMPLITUDE_API_KEY is not configured.");
    return false;
  }

  const initialization = (async () => {
    try {
      await amplitude.initAll(VCC_CONFIG.amplitude.apiKey, {
        analytics: { autocapture: VCC_CONFIG.amplitude.autocapture },
        sessionReplay: { sampleRate: VCC_CONFIG.amplitude.sessionReplaySampleRate },
        engagement: { skip: true },
      });
      analyticsReady = true;
      track("VCC Page Viewed");
      return true;
    } catch (error) {
      console.warn("Amplitude initialization failed.", error);
      delete window[INIT_FLAG];
      return false;
    }
  })();

  window[INIT_FLAG] = initialization;
  return initialization;
}

app.innerHTML = `
  <main>
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">Executive Operations Review | ${reviewDate}</p>
      <h1 id="page-title">${VCC_CONFIG.company}</h1>
      <p class="lead">
        ${VCC_CONFIG.division} command workspace for Wyoming NEMT, rural special-needs mobility,
        grant readiness, compliance governance, revenue generation, and launch execution.
      </p>
      <div class="identity-grid">
        <div><span>Corporate email</span><strong>${VCC_CONFIG.corporateEmail}</strong></div>
        <div><span>Website</span><strong>${VCC_CONFIG.website}</strong></div>
        <div><span>Priority</span><strong>Funded Wyoming pilot</strong></div>
      </div>
      <div class="button-row">
        <a href="${VCC_CONFIG.website}" data-vcc-event="VCC Website Clicked">Company Website</a>
        <a href="mailto:${VCC_CONFIG.corporateEmail}" data-vcc-event="VCC Contact Intent">Email VCC</a>
        <a href="${PLATTE_COUNTY_QUESTIONNAIRE_URL}" target="_blank" rel="noreferrer" data-vcc-event="Platte County Questionnaire Opened" data-label="Hero questionnaire CTA">Platte County Questionnaire</a>
        <button type="button" data-vcc-event="VCC Funding Interest">Track Funding Interest</button>
        <button type="button" data-vcc-event="VCC Service Area Interest">Track Service Area Interest</button>
      </div>
    </section>

    <section aria-labelledby="platte-county-questionnaire">
      <div class="section-heading">
        <p class="eyebrow">Platte County pre-launch community input</p>
        <h2 id="platte-county-questionnaire">Help document rural transportation needs</h2>
      </div>
      <div class="card">
        <h3>Platte County Transportation Gap Questionnaire</h3>
        <p>
          VILIGANS COMMAND CORPORATION is gathering community input before any transportation service launch.
          The questionnaire helps document where scheduled, non-emergency rural transportation gaps may exist,
          what kinds of trips are being delayed or missed, and where coordination with existing Platte County
          providers and community organizations may be useful.
        </p>
        <p>
          We explain why each question is asked so respondents can understand how their answers support
          pre-launch demand and coordination analysis. Responses are retained for that planning purpose.
        </p>
        <p class="note">
          <strong>Planning notice:</strong> This questionnaire is not a ride request or reservation, does not create
          a customer relationship, and is not a representation or guarantee that transportation service is currently
          operating or will launch. Do not use the questionnaire for emergencies.
        </p>
        <div class="button-row">
          <a href="${PLATTE_COUNTY_QUESTIONNAIRE_URL}" target="_blank" rel="noreferrer" data-vcc-event="Platte County Questionnaire Opened" data-label="Pre-launch questionnaire CTA">Share Your Experience</a>
        </div>
      </div>
    </section>

    <section aria-labelledby="immediate-actions">
      <div class="section-heading">
        <p class="eyebrow">Immediate actions</p>
        <h2 id="immediate-actions">Highest-impact work to move toward launch</h2>
      </div>
      <div class="action-list">
        ${immediateActions
          .map(
            (item, index) => `
              <article class="action-item">
                <span class="rank">${index + 1}</span>
                <div>
                  <h3>${item.title}</h3>
                  <p>${item.detail}</p>
                  <p class="card-meta">Owner: ${item.owner} | Due: ${item.due} | Impact: ${item.impact}/100</p>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>

    <section aria-labelledby="funding">
      <div class="section-heading">
        <p class="eyebrow">Funding opportunities</p>
        <h2 id="funding">Open and actionable funding pipeline</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Opportunity</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Fit</th>
              <th>Next action</th>
            </tr>
          </thead>
          <tbody>${opportunityRows()}</tbody>
        </table>
      </div>
      <p class="note">
        Primary grant strategy: pursue ICAM and WYDOT transit funding through the strongest eligible applicant path,
        while building earned revenue through clinic, county, employer, and sponsor agreements.
      </p>
    </section>

    <section aria-labelledby="compliance">
      <div class="section-heading">
        <p class="eyebrow">Compliance requirements and risks</p>
        <h2 id="compliance">Wyoming operating gates</h2>
      </div>
      <div class="grid two">
        ${complianceTasks
          .map((item) =>
            card(
              `<a href="${item.url}" target="_blank" rel="noreferrer">${item.title}</a>`,
              `${item.requirement}`,
              `Business risk: ${item.risk}`,
            ),
          )
          .join("")}
      </div>
    </section>

    <section aria-labelledby="revenue">
      <div class="section-heading">
        <p class="eyebrow">Revenue opportunities</p>
        <h2 id="revenue">Non-dilutive money before and alongside grants</h2>
      </div>
      <div class="grid four">
        ${revenueOpportunities
          .map((item) => card(item.name, item.next, `Target: ${item.target}`))
          .join("")}
      </div>
    </section>

    <section aria-labelledby="partners">
      <div class="section-heading">
        <p class="eyebrow">Partnership opportunities</p>
        <h2 id="partners">Organizations to move this week</h2>
      </div>
      <ul class="status-list">
        ${partnerPipeline.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section aria-labelledby="launch">
      <div class="section-heading">
        <p class="eyebrow">Next steps</p>
        <h2 id="launch">90-day launch plan ranked by estimated impact</h2>
      </div>
      <div class="timeline">
        ${launchPlan
          .map(
            (item) => `
              <article class="timeline-item">
                <span>${item.phase}</span>
                <h3>${item.task}</h3>
                <p>${item.output}</p>
                <strong>Impact ${item.impact}/100</strong>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>

    <section aria-labelledby="system-status">
      <div class="section-heading">
        <p class="eyebrow">Codex + GitHub + Amplitude</p>
        <h2 id="system-status">Infrastructure status</h2>
      </div>
      <ul class="status-list">
        <li><strong>Repository identity:</strong> aligned to VCC and DOCS NREMT & Logistics.</li>
        <li><strong>Analytics:</strong> one client-side Amplitude initialization path with privacy-conscious defaults.</li>
        <li><strong>Events:</strong> custom VCC business events avoid form contents and sensitive rider data.</li>
        <li><strong>Workflow:</strong> Vite validation and GitHub Pages deployment are configured through GitHub Actions.</li>
      </ul>
    </section>
  </main>
`;

void initializeAmplitude();

document.querySelectorAll("[data-vcc-event]").forEach((element) => {
  element.addEventListener("click", () => {
    track(element.dataset.vccEvent, {
      label: element.dataset.label || element.textContent.trim(),
      href: element.getAttribute("href") || undefined,
    });
  });
});