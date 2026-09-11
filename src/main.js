import * as amplitude from "@amplitude/unified";
import { VCC_CONFIG, VCC_ANALYTICS_CONTEXT } from "./config.js";
import "./styles.css";

const INIT_FLAG = "__VCC_AMPLITUDE_INITIALIZED__";
const reviewDate = "September 11, 2026";
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
        VILIGANS COMMAND CORPORATION is evaluating documented transportation gaps and possible
        coordination needs in Platte County, Wyoming.
      </p>
      <p class="note">
        <strong>Planning-stage notice:</strong> VCC is not currently providing passenger transportation.
        This website does not offer rides, accept reservations, establish eligibility, confirm funding,
        insurance, licensing, certification, Medicaid enrollment, partnerships, or announce a service launch.
      </p>
    </section>

    <section id="questionnaire-paused" aria-labelledby="questionnaire-status">
      <div class="section-heading">
        <p class="eyebrow">Community-input control</p>
        <h2 id="questionnaire-status">Questionnaire temporarily unavailable</h2>
      </div>
      <div class="card">
        <p>
          The Platte County Transportation Gap Questionnaire is temporarily unavailable while VCC
          verifies privacy notice, retention, deletion, access, partial-response, and authorization controls.
        </p>
        <p>
          No transportation request, reservation, intake, or passenger-service commitment is accepted here.
          For emergencies, call 911.
        </p>
      </div>
    </section>

    <section aria-labelledby="planning-scope">
      <div class="section-heading">
        <p class="eyebrow">Proposed scope</p>
        <h2 id="planning-scope">Evidence under review</h2>
      </div>
      <div class="grid two">
        <article class="card">
          <h3>Community need</h3>
          <p>Aggregate evidence concerning rural transportation gaps, missed essential trips, and non-duplication.</p>
        </article>
        <article class="card">
          <h3>Readiness controls</h3>
          <p>Operating authority, insurance, vehicle configuration, driver qualifications, safety systems, funding, and partner workflows remain subject to verification and approval.</p>
        </article>
      </div>
    </section>
  </main>
`;

void initializeAmplitude();
