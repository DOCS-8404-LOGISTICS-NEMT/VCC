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


## Sentinel evaluation and coding contract (0.3.0)
Every response passes a separate structured evaluator for Autonomy, Verification,
Retention and Precision. A failed review triggers correction, with at most three
reviewed drafts. Exhaustion or malformed evaluation rejects delivery; HTTP returns
503 and CLI exits nonzero. Passing output includes the four checks and evidence.
This adds up to six model calls and additional latency/cost per request.

Coding instructions cover source inspection, diagnosis, patches and regression
verification. This advisory runtime has no shell/filesystem/repository execution
tools. Those actions require the connected coding workspace; prompts do not grant tools.
Supply relevant source, prior corrections and attributable results in each request;
this version does not persist cross-request memory. Model review cannot independently
verify external evidence or guarantee factual accuracy.

`/health` reports configuration only, never readiness from key presence. A configured
runtime reports `unverified` and `evaluation=not_probed`. Live evaluation still requires
an approved bound credential. Run `python -m pytest tests` for mocked offline checks.
Rollback: revert this change; no deployment or launch authority is granted.
