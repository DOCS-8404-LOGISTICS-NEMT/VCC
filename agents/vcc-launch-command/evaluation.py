"""Typed delivery gate. Model review is not proof of external execution."""
from pydantic import BaseModel, ConfigDict, StrictBool, Field

class Check(BaseModel):
    model_config = ConfigDict(extra="forbid")
    passed: StrictBool
    evidence: str = Field(min_length=1)

class Evaluation(BaseModel):
    model_config = ConfigDict(extra="forbid")
    autonomy: Check
    verification: Check
    retention: Check
    precision: Check
    corrections: list[str]

    @property
    def passed(self) -> bool:
        return all(getattr(self, name).passed for name in
                   ("autonomy", "verification", "retention", "precision")) and not self.corrections

class EvaluationFailed(RuntimeError):
    pass

def render_audit(review: Evaluation, attempts: int) -> str:
    lines = ["", "", f"SELF-EVALUATION — PASS; reviewed drafts: {attempts}"]
    for name in ("autonomy", "verification", "retention", "precision"):
        lines.append(f"{name.upper()}: PASS — {getattr(review, name).evidence}")
    lines.append("Scope: model review of supplied evidence; external actions require tool verification.")
    return "\n".join(lines)
