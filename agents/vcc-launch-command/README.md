# VCC Launch Command Agent

Small Python OpenAI Agents SDK service for evidence-controlled VCC LAUNCH planning.

## Status
Prototype only. This software does not authorize transportation operations or any legal, financial, contractual, purchasing, insurance, funding, or launch-gate action.

## Requirements
- Python 3.11+
- `uv`
- `OPENAI_API_KEY` supplied through the runtime environment; never commit it to GitHub.

## Install
```bash
uv sync
```

## CLI smoke
```bash
uv run python main.py --input "Assess Launch Gate 4 when we have an insurance planning inquiry but no bound passenger-transportation policy."
```

Expected behavior: the response keeps Gate 4 unresolved, distinguishes planning evidence from active insurance, recommends the smallest next evidence-gathering action, and does not authorize passenger operations.

## HTTP service
```bash
PORT=8421 uv run python main.py
curl -fsS http://127.0.0.1:8421/health
```

POST JSON to `/command`:
```json
{"input":"Prepare a Gate 5 evidence brief from three unverified reports of missed rides."}
```

## Deployment
When separately authorized, deploy this directory through the OpenAI Agents SDK Deployment Manager. Local deployment is not evidence of VCC transportation readiness.
