"""Run VCC behavioral regression cases through the real Agent SDK entrypoint.

Requires OPENAI_API_KEY. Results are written locally and intentionally ignored by git.
"""
import asyncio
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from agent import run_agent  # noqa: E402

CASES_PATH = Path(__file__).with_name("cases.jsonl")
RESULT_PATH = Path(__file__).parent / "results" / "latest.json"


async def main() -> int:
    if not os.getenv("OPENAI_API_KEY"):
        print("BLOCKED: OPENAI_API_KEY is not bound to this runtime.")
        return 2

    results = []
    for line in CASES_PATH.read_text().splitlines():
        case = json.loads(line)
        output = (await run_agent(case["input"])).lower()
        missing = [term for term in case["must_include"] if term.lower() not in output]
        forbidden = [term for term in case["must_not_include"] if term.lower() in output]
        results.append(
            {
                "id": case["id"],
                "passed": not missing and not forbidden,
                "missing": missing,
                "forbidden": forbidden,
            }
        )

    RESULT_PATH.parent.mkdir(exist_ok=True)
    RESULT_PATH.write_text(json.dumps({"results": results}, indent=2) + "\n")
    failed = [result["id"] for result in results if not result["passed"]]
    print(json.dumps({"passed": not failed, "failed_cases": failed}))
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
