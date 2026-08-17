import * as amplitude from "@amplitude/unified";
import { VCC_CONFIG, VCC_ANALYTICS_CONTEXT } from "./config.js";
import "./styles.css";

const INIT_FLAG = "__VCC_AMPLITUDE_INITIALIZED__";
const reviewDate = "July 30, 2026";

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
        <button type="button" data-vcc-event="VCC Funding Interest">Track Funding Interest</button>
        <button type="button" data-vcc-event="VCC Service Area Interest">Track Service Area Interest</button>
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
      <p class="section-summary">${body}</p>
    </div>
  `;
}

    <section aria-labelledby="system-status">
      <div class="section-heading">
        <p class="eyebrow">Codex + GitHub + Amplitude</p>
        <h2 id="system-status">Infrastructure status</h2>
      </div>
      <ul class="status-list">
        <li><strong>Repository identity:</strong> aligned to VCC and DOCS NREMT & Logistics.</li>
        <li><strong>Analytics:</strong> Amplitude initializes once in client-side browser code using <code>@amplitude/unified</code>.</li>
        <li><strong>Events:</strong> page view, website click, contact intent, funding interest, and service-area interest are tracked with VCC metadata.</li>
        <li><strong>Workflow:</strong> Vite build validation is configured for GitHub Actions.</li>
      </ul>
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
        Current close status: the August 9 funding and August 15 vehicle goals remain possible but unproven. Use the August 4 reality lock before activating Batch A proof contact; the proof clock forces dated continue/pivot decisions if rental, lease, purchase, insurance, authority, or cash proof slips.
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
        "Verified references used for the August 4, 2026 workspace",
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

void initializeAmplitude();

document.querySelectorAll("[data-vcc-event]").forEach((element) => {
  element.addEventListener("click", () => {
    track(element.dataset.vccEvent, {
      label: element.dataset.label || element.textContent.trim(),
      href: element.getAttribute("href") || undefined,
    });
  });
});
