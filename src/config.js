const envApiKey = import.meta.env.VITE_AMPLITUDE_API_KEY?.trim();

function sessionReplaySampleRate() {
  const configuredRate = Number.parseFloat(
    import.meta.env.VITE_AMPLITUDE_SESSION_REPLAY_SAMPLE_RATE,
  );

  if (Number.isFinite(configuredRate) && configuredRate >= 0 && configuredRate <= 1) {
    return configuredRate;
  }

  return import.meta.env.DEV ? 1 : 0.01;
}

export const VCC_CONFIG = Object.freeze({
  company: "VILIGANS COMMAND CORPORATION",
  division: "Platte County Pre-Launch Planning",
  corporateEmail: "aldavis@viliganscommandcorp.com",
  website: "https://www.viliganscommandcorp.com",
  reservedApex: "https://viliganscommandcorp.com",
  amplitude: Object.freeze({
    apiKey: envApiKey || "",
    autocapture: Object.freeze({
      attribution: false,
      fileDownloads: false,
      formInteractions: false,
      pageViews: false,
      sessions: true,
      elementInteractions: false,
      networkTracking: false,
      webVitals: true,
      frustrationInteractions: false,
    }),
    sessionReplaySampleRate: sessionReplaySampleRate(),
  }),
});

export const VCC_ANALYTICS_CONTEXT = Object.freeze({
  company: VCC_CONFIG.company,
  division: VCC_CONFIG.division,
  website: VCC_CONFIG.website,
});
