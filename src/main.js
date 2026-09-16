import * as amplitude from "@amplitude/unified";
import { VCC_CONFIG, VCC_ANALYTICS_CONTEXT } from "./config.js";
import "./styles.css";

const INIT_FLAG = "__VCC_AMPLITUDE_INITIALIZED__";
const reviewDate = "September 16, 2026";
const PLATTE_COUNTY_QUESTIONNAIRE_URL = "/gap-survey";
const app = document.querySelector("#app");

if (!app) {
  throw new Error("Vite application root #app was not found.");
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
      <p class="eyebrow">Platte County transportation planning | Reviewed ${reviewDate}</p>
      <h1 id="page-title">${VCC_CONFIG.company}</h1>
      <p class="lead">
        VILIGANS COMMAND CORPORATION is gathering information about rural transportation needs in Platte County, Wyoming.
        Your input helps us understand where gaps exist, what matters most, and where coordination may be useful.
      </p>
      <p class="note">
        <strong>Pre-launch planning notice:</strong> VCC is not currently providing passenger transportation.
        This website does not offer rides, accept reservations, establish eligibility, or represent that VCC is
        licensed, insured, funded, Medicaid-enrolled, partnered, or operationally ready.
      </p>
      <div class="button-row">
        <a href="${PLATTE_COUNTY_QUESTIONNAIRE_URL}" data-vcc-event="Platte County Questionnaire Opened" data-label="Hero questionnaire CTA">Take the Platte County Transportation Gap Questionnaire</a>
      </div>
    </section>

    <section aria-labelledby="platte-county-questionnaire">
      <div class="section-heading">
        <p class="eyebrow">Community input</p>
        <h2 id="platte-county-questionnaire">Help document Platte County transportation gaps</h2>
      </div>
      <div class="card">
        <h3>Platte County Transportation Gap Questionnaire</h3>
        <p>
          This short questionnaire gathers planning information about transportation challenges, missed or delayed
          essential trips, barriers, and possible coordination needs. It is intended for Platte County residents,
          seniors, veterans, caregivers, people with disabilities, and other rural residents who encounter transportation barriers.
        </p>
        <p>
          VCC is using community input to understand potential unmet demand and avoid duplicating existing services.
          The proposed pilot scope remains scheduled, pre-booked, non-emergency and non-ambulance transportation;
          school/work trips, oxygen transport, hazardous materials, emergencies, and ambulance service are excluded.
        </p>
        <p class="note">
          <strong>What this is not:</strong> The questionnaire is not a ride request, reservation, eligibility decision,
          customer relationship, or promise of future service. Do not submit medical records, Social Security numbers,
          financial-account information, or other sensitive personal information. For emergencies, call 911.
        </p>
        <div class="button-row">
          <a href="${PLATTE_COUNTY_QUESTIONNAIRE_URL}" data-vcc-event="Platte County Questionnaire Opened" data-label="Questionnaire section CTA">Share Your Transportation Experience</a>
        </div>
      </div>
    </section>

    <section aria-labelledby="planning-scope">
      <div class="section-heading">
        <p class="eyebrow">Proposed scope</p>
        <h2 id="planning-scope">Evidence and readiness under review</h2>
      </div>
      <div class="grid two">
        <article class="card">
          <h3>Community need</h3>
          <p>VCC is gathering aggregate evidence concerning rural transportation gaps, missed essential trips, existing-service boundaries, and non-duplication.</p>
        </article>
        <article class="card">
          <h3>Readiness controls</h3>
          <p>Operating authority, passenger-transportation insurance, vehicle/accessibility configuration, driver qualifications, safety systems, funding, and partner workflows remain subject to verification and approval before service may begin.</p>
        </article>
      </div>
    </section>
  </main>
`;

void initializeAmplitude();

document.querySelectorAll("[data-vcc-event]").forEach((element) => {
  element.addEventListener("click", () => {
    track(element.dataset.vccEvent, {
      label: element.dataset.label || element.textContent?.trim(),
      href: element.getAttribute("href") || undefined,
    });
  });
});
