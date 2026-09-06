import argparse
import asyncio
import os

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

from agent import run_agent

app = FastAPI(title="VCC Launch Command Agent", version="0.1.0")


class CommandRequest(BaseModel):
    input: str


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "posture": "CONTINUE PLANNING / HOLD OPERATIONS"}


@app.post("/command")
async def command(request: CommandRequest) -> dict[str, str]:
    if not request.input.strip():
        raise HTTPException(status_code=400, detail="input is required")
    output = await run_agent(request.input)
    return {"output": output}


def cli() -> None:
    parser = argparse.ArgumentParser(description="VCC Launch Command Agent")
    parser.add_argument("--input", help="Planning/evidence question for the agent")
    args = parser.parse_args()
    if not args.input:
        parser.error("--input is required when PORT is not set")
    print(asyncio.run(run_agent(args.input)))


if __name__ == "__main__":
    port = os.getenv("PORT")
    if port:
        uvicorn.run(app, host="0.0.0.0", port=int(port))
    else:
        cli()
