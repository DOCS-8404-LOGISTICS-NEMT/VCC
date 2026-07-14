![Auto Assign](https://github.com/DOCS-8404-LOGISTICS-NEMT/demo-repository/actions/workflows/auto-assign.yml/badge.svg)

![Vite Build](https://github.com/DOCS-8404-LOGISTICS-NEMT/demo-repository/actions/workflows/proof-html.yml/badge.svg)

# VILIGANS COMMAND CORPORATION - DOCS NREMT & Logistics

This repository supports VILIGANS COMMAND CORPORATION (VCC) and DOCS NREMT & Logistics, a Wyoming-based non-emergency medical transportation (NEMT), logistics, and rural health access initiative.

The application provides a working Vite foundation for Amplitude analytics, Codex-assisted repository maintenance, GitHub Actions validation, and future VCC operational tooling.

## Corporate identity

- Website: https://viliganscommandcorp.com
- Corporate email: aldavis@viliganscommandcorp.com
- Company: VILIGANS COMMAND CORPORATION
- Division: DOCS NREMT & Logistics

## Application structure

- `index.html` - Vite bootstrap page
- `src/main.js` - application UI and Amplitude initialization
- `src/config.js` - centralized VCC and analytics configuration
- `src/styles.css` - shared application styling
- `AGENTS.md` - Codex operating instructions
- `.github/workflows/proof-html.yml` - Vite production build validation
- `.env.example` - optional local environment override template

## Local development

```bash
npm install
npm run dev
```

Vite will print a local URL, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Amplitude events

The application currently emits:

- `VCC Page Viewed`
- `VCC Website Clicked`
- `VCC Contact Intent`
- `VCC Service Area Interest`
- `VCC Funding Interest`

Each event includes the shared VCC company, division, corporate email, and website context.

## Environment configuration

The browser SDK may read `VITE_AMPLITUDE_API_KEY` from `.env.local`. The Amplitude project API key is client-visible by design; passwords, GitHub tokens, OpenAI API keys, and other private credentials must never be committed.

## GitHub Actions

The workflow stored at `.github/workflows/proof-html.yml` now performs the following checks on pushes and pull requests to `main`:

1. Checks out the repository.
2. Sets up Node.js 22.
3. Installs npm dependencies.
4. Runs `npm run build`.
5. Confirms that `dist/index.html` exists.

## Repository status

The repository remains private while VCC develops internal business and technical infrastructure. Private visibility does not prevent browser-side Amplitude event ingestion, but GitHub and Codex integrations require explicit repository access.
