import argparse
import asyncio
import logging
import os
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

from agent import run_agent
from evaluation import EvaluationFailed

app = FastAPI(title="VCC Launch Command Agent", version="0.3.0")
logger = logging.getLogger("vcc_launch_command")


class CommandRequest(BaseModel):
    input: str


def runtime_configured() -> bool:
    """Return credential availability without inspecting or exposing its value."""
    return bool(os.getenv("OPENAI_API_KEY"))


@app.get("/health")
async def health() -> dict[str, str]:
    return {
        "status": "unverified" if runtime_configured() else "degraded",
        "posture": "CONTINUE PLANNING / HOLD OPERATIONS",
        "runtime": "configured" if runtime_configured() else "credential_unbound",
        "evaluation": "not_probed",
    }


@app.post("/command")
async def command(request: CommandRequest) -> dict[str, str]:
    if not request.input.strip():
        raise HTTPException(status_code=400, detail="input is required")

    request_id = uuid4().hex
    if not runtime_configured():
        logger.warning("command_rejected request_id=%s reason=credential_unbound", request_id)
        raise HTTPException(
            status_code=503,
            detail={
                "code": "agent_runtime_unavailable",
                "reason": "credential_unbound",
                "request_id": request_id,
            },
        )

    try:
        output = await run_agent(request.input)
    except EvaluationFailed:
        raise HTTPException(status_code=503, detail={
            "code": "agent_output_rejected", "reason": "self_evaluation_failed",
            "request_id": request_id,
        }) from None
    except Exception as error:
        logger.error(
            "command_failed request_id=%s error_type=%s",
            request_id,
            type(error).__name__,
        )
        raise HTTPException(
            status_code=503,
            detail={
                "code": "agent_runtime_unavailable",
                "reason": "execution_failed",
                "request_id": request_id,
            },
        ) from error

    return {"output": output, "request_id": request_id}


def cli() -> None:
    parser = argparse.ArgumentParser(description="VCC Launch Command Agent")
    parser.add_argument("--input", help="Planning/evidence question for the agent")
    args = parser.parse_args()
    if not args.input:
        parser.error("--input is required when PORT is not set")
    if not runtime_configured():
        parser.error("agent runtime unavailable: credential_unbound")
    try:
        print(asyncio.run(run_agent(args.input)))
    except EvaluationFailed:
        parser.exit(1, "agent output rejected: self_evaluation_failed\n")


if __name__ == "__main__":
    port = os.getenv("PORT")
    if port:
        uvicorn.run(app, host="0.0.0.0", port=int(port))
    else:
        cli()

