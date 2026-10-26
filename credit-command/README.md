# Credit Command domain kernel

This folder is the first, deliberately small engineering slice for Credit Command / CR-0001.

It contains deterministic, PII-free domain code and synthetic fixtures only. It does **not** ingest reports, send disputes, connect to Amplitude, upload evidence, or make claims about a live account. The VCC transportation UI and analytics configuration under `src/` are not used here.

Run its tests with:

```bash
npm run test:credit-command
```

`private/`, `imports/`, and `evidence/` are ignored so source reports and live evidence cannot be committed accidentally.
