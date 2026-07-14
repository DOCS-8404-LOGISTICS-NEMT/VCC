import * as amplitude from "@amplitude/unified";
import { VCC_CONFIG, VCC_ANALYTICS_CONTEXT } from "./config.js";
import "./styles.css";

const INIT_FLAG = "__VCC_AMPLITUDE_INITIALIZED__";

const app = document.querySelector("#app");

if (!app) {
  throw new Error("Vite application root #app was not found.");
}

app.innerHTML = `
  <main>
    <div class="hero">
      <h1>${VCC_CONFIG.company}</h1>
      <p>
        ${VCC_CONFIG.division} supports Wyoming non-emergency medical transportation,
        rural health access, logistics readiness, and veteran-founded business infrastructure.
      </p>
      <p>
        Corporate contact identity:
        <a href="mailto:${VCC_CONFIG.corporateEmail}" data-vcc-event="VCC Contact Intent">
          ${VCC_CONFIG.corporateEmail}
        </a>
      </p>
      <div class="button-row">
        <a href="${VCC_CONFIG.website}" data-vcc-event="VCC Website Clicked">Company Website</a>
        <button type="button" data-vcc-event="VCC Service Area Interest">Track Service Area Interest</button>
        <button type="button" data-vcc-event="VCC Funding Interest">Track Funding Interest</button>
      </div>
    </div>

    <section aria-labelledby="system-status">
      <h2 id="system-status">Codex + GitHub + Amplitude Status</h2>
      <ul class="status-list">
        <li><strong>Repository identity:</strong> aligned to VCC and DOCS NREMT & Logistics.</li>
        <li><strong>Corporate email:</strong> <code>${VCC_CONFIG.corporateEmail}</code>.</li>
        <li><strong>Codex context:</strong> repository instructions are stored in <code>AGENTS.md</code>.</li>
        <li><strong>Client configuration:</strong> VCC and Amplitude values are centralized in <code>src/config.js</code>.</li>
        <li><strong>Application entry:</strong> Vite loads <code>src/main.js</code>.</li>
        <li><strong>Client analytics:</strong> Amplitude initializes once in browser-only code.</li>
      </ul>
    </section>

    <section aria-labelledby="company-focus">
      <h2 id="company-focus">Company Focus</h2>
      <div class="grid">
        <article class="card">
          <h3>NEMT</h3>
          <p>Non-emergency medical transportation planning and service-readiness for Wyoming communities.</p>
        </article>
        <article class="card">
          <h3>Rural Health Access</h3>
          <p>Transportation infrastructure aligned with rural healthcare access needs.</p>
        </article>
        <article class="card">
          <h3>Automation</h3>
          <p>Codex, GitHub Actions, and analytics workflows for operational readiness.</p>
        </article>
      </div>
    </section>

    <section aria-labelledby="analytics-status">
      <h2 id="analytics-status">Amplitude Analytics</h2>
      <p>
        Amplitude is initialized from the Vite application with autocapture and Session Replay enabled.
        Custom VCC events are emitted for page view, website click, contact intent, service-area interest,
        and funding interest.
      </p>
      <p class="note">Click an action above and verify the event in Amplitude.</p>
    </section>
  </main>
`;

function track(eventName, properties = {}) {
  amplitude.track(eventName, {
    ...VCC_ANALYTICS_CONTEXT,
    page_title: document.title,
    page_path: window.location.pathname,
    ...properties,
  });
}

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
      label: element.textContent.trim(),
    });
  });
});
