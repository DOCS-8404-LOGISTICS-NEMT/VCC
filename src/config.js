const envApiKey = import.meta.env.VITE_AMPLITUDE_API_KEY?.trim();

export const VCC_CONFIG = Object.freeze({
  company: "VILIGANS COMMAND CORPORATION",
  division: "DOCS NREMT & Logistics",
  corporateEmail: "aldavis@viliganscommandcorp.com",
  website: "https://viliganscommandcorp.com",
  amplitude: Object.freeze({
    apiKey: envApiKey || "8ea17b30e1283120fab527855172550d",
    autocapture: true,
    sessionReplaySampleRate: 1,
  }),
});

export const VCC_ANALYTICS_CONTEXT = Object.freeze({
  company: VCC_CONFIG.company,
  division: VCC_CONFIG.division,
  corporate_email: VCC_CONFIG.corporateEmail,
  website: VCC_CONFIG.website,
});
