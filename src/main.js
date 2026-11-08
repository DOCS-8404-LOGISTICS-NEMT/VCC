import * as amplitude from "@amplitude/unified";
import { VCC_CONFIG, VCC_ANALYTICS_CONTEXT } from "./config.js";
import "./styles.css";

const app = document.querySelector("#app");
if (!app) throw new Error("Missing application root");

const contact = "mailto:aldavis@viliganscommandcorp.com?subject=VCC%20Private%20Partnership%20Inquiry";
const linkAttrs = 'rel="noopener noreferrer"';
app.innerHTML = `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
 <a class="wordmark" href="/" aria-label="VILIGANS COMMAND CORPORATION home"><span class="mark">V<span class="mark-dot">.</span></span><span>VILIGANS <strong>COMMAND</strong><small>CORPORATION</small></span></a>
 <nav aria-label="Main navigation"><a href="#mission">Mission</a><a href="#evidence">Why Platte County</a><a href="/transportation.html">Transportation</a><a href="/del-ranger.html">Corporal Del</a><a class="nav-cta" href="#connect">Get involved</a></nav>
</header>
<main id="main">
 <section class="hero">
   <div class="hero-art" aria-hidden="true"><span class="orbit orbit-one"></span><span class="orbit orbit-two"></span><span class="hero-symbol">V<span>.</span></span><span class="hero-gridline"></span></div>
   <div class="hero-copy"><p class="eyebrow">WHEATLAND, WYOMING · VETERAN-LED · PRE-LAUNCH</p>
     <h1>Built for the <em>distance.</em><br>Driven by the <em>mission.</em></h1>
     <p class="lead">Rural connections matter. VILIGANS COMMAND CORPORATION is exploring how supplemental, wheelchair-accessible, winter-capable transportation could strengthen the organizations already serving Platte County.</p>
     <div class="actions"><a class="button button-gold" href="/transportation.html" data-vcc-event="Transportation Detail Opened">Explore the initiative</a><a class="button button-outline" href="#connect">Discuss a partnership</a></div>
     <p class="hero-note">Planning-stage initiative. No passenger service, ride bookings, or operational authorization.</p>
   </div>
 </section>
 <section id="mission" class="section section-dark"><div class="section-kicker">01 / THE MISSION</div><div class="two-columns"><div><h2>Support the network.<br><span>Don't replace it.</span></h2></div><div><p>Platte County already has dedicated transportation organizations. Our mission is to identify where additional capacity might help—especially with accessibility, longer-distance trips, and winter challenges.</p><a class="text-link" href="/transportation.html">Read the evidence and proposed approach →</a></div></div></section>
 <section id="evidence" class="section evidence"><div class="section-kicker">02 / VERIFIED PUBLIC EVIDENCE</div><h2>The need deserves an <span>evidence-first response.</span></h2><div class="evidence-grid">
  <article><strong>29.2%</strong><h3>Residents age 65+</h3><p>Platte County demographic indicator—not a count of people who need rides.</p><a href="https://www.census.gov/quickfacts/fact/table/plattecountywyoming/PST045225" ${linkAttrs}>U.S. Census Bureau ↗</a></article>
  <article><strong>Access</strong><h3>Capacity pressure</h3><p>Services for Seniors reports increasing wheelchair/walker assistance needs and fewer available ride segments as assistance time grows.</p><a href="https://www.sfswy.org/" ${linkAttrs}>Services for Seniors ↗</a></article>
  <article><strong>Regional</strong><h3>Volunteer-dependent trips</h3><p>Platte ParaTransit describes regional medical appointments subject to need and driver availability.</p><a href="https://platteparatransit.org/" ${linkAttrs}>Platte ParaTransit ↗</a></article>
 </div></section>
 <section class="section divisions"><div class="section-kicker">03 / THE VCC UNIVERSE</div><h2>Two missions. <span>One commitment to legacy.</span></h2>
   <div class="division-grid"><article class="division division-transport"><div class="division-label">COMMUNITY INITIATIVE</div><h3>Rural Transportation</h3><p>Partner conversations, evidence gathering, funding exploration, and the path to a safe, authorized pilot.</p><a class="button button-outline" href="/transportation.html">Explore the mission →</a></article>
   <article class="division division-ranger"><div class="division-label">THE LEGACY DIVISION</div><h3>Corporal Del's<br>Motor Pool</h3><p>Ford Ranger diagnostics, mechanical grit, garage humor, and a continuing tribute to Corporal Shaundel “Del” Davis, USMC.</p><a class="button button-outline" href="/del-ranger.html">Enter the Motor Pool →</a></article></div>
 </section>
 <section id="connect" class="section contact-section"><div class="section-kicker">04 / CALL TO ACTION</div><h2>Help build what <em>comes next.</em></h2><p>We're seeking private introductions to organizations, community leaders, sponsors, and capital resources. Start a conversation—without signing up for rides or sharing personal medical information.</p><div class="actions"><a class="button button-gold" href="${contact}" data-vcc-event="Partnership Contact Opened">Start a private conversation</a><a class="button button-outline" href="/del-ranger.html">Visit Del's Ranger Division</a></div><p class="small">aldavis@viliganscommandcorp.com · Wheatland, Wyoming</p></section>
</main>
<footer><p>© ${new Date().getFullYear()} VILIGANS COMMAND CORPORATION. All rights reserved.</p><p>Planning only · No rides or reservations · <a href="mailto:aldavis@viliganscommandcorp.com">Corporate contact</a></p></footer>
`;
let analyticsReady = false;
let initializeCalled = false;
async function initializeAnalytics() {
 if (initializeCalled || !VCC_CONFIG.amplitude.apiKey) return;
 initializeCalled = true;
 try {
  await amplitude.initAll(VCC_CONFIG.amplitude.apiKey, { analytics: { autocapture: VCC_CONFIG.amplitude.autocapture }, sessionReplay: { sampleRate: 0 }, engagement: { skip: true } });
  analyticsReady = true;
  track("VCC Page Viewed", { page_path: window.location.pathname });
 } catch (error) { console.warn("Optional analytics unavailable"); }
}
function track(event, props = {}) {
 if (!analyticsReady) return;
 amplitude.track(event, { ...VCC_ANALYTICS_CONTEXT, page_path: window.location.pathname, ...props });
}
document.querySelectorAll("[data-vcc-event]").forEach(element => element.addEventListener("click", () => {
 track(element.dataset.vccEvent, { destination: element.getAttribute("href")?.startsWith("mailto:") ? "email" : "internal" });
}));
void initializeAnalytics();
