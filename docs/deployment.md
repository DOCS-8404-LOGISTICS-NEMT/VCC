# VCC Website Deployment

This project is configured to build and deploy the VCC website through GitHub Pages.

## Corporate Identity

- Company: VILIGANS COMMAND CORPORATION
- Website: https://viliganscommandcorp.com
- Corporate email: aldavis@viliganscommandcorp.com
- Public site app: DOCS NREMT & Logistics launch dashboard

## Deployment Flow

1. Codex updates the source files.
2. GitHub stores the approved source of truth.
3. GitHub Actions builds the Vite website.
4. GitHub Pages publishes the production artifact.
5. Amplitude tracks browser-side website behavior after the page loads.

## Required GitHub Setting

In the GitHub repository settings, Pages should use:

- Source: GitHub Actions

## Required DNS Setting

The repository includes `public/CNAME` for:

```text
viliganscommandcorp.com
```

To make the corporate domain point to GitHub Pages, update DNS at the domain provider:

```text
viliganscommandcorp.com     A      185.199.108.153
viliganscommandcorp.com     A      185.199.109.153
viliganscommandcorp.com     A      185.199.110.153
viliganscommandcorp.com     A      185.199.111.153
www                         CNAME  docs-8404-logistics-nemt.github.io
```

Current known DNS still points the public domain toward Google-hosted infrastructure, so pushing this repository does not by itself update the live public site until DNS is changed or the Google Site is manually updated.

## Publication Guardrails

- Do not publish draft legal, grant, lending, insurance, or regulatory materials as final.
- Do not expose private keys, passwords, API secrets, SAM.gov credentials, or bank information.
- Keep VCC and DOCS NREMT & Logistics as the active business identity.
