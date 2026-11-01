import asyncio
import sys
from pathlib import Path
from unittest.mock import AsyncMock, patch

from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import main  # noqa: E402


def test_health_reports_degraded_when_credential_is_unbound(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    response = TestClient(main.app).get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "degraded"
    assert response.json()["runtime"] == "credential_unbound"


def test_command_returns_sanitized_unbound_diagnostic(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    response = TestClient(main.app).post("/command", json={"input": "status"})
    assert response.status_code == 503
    detail = response.json()["detail"]
    assert detail["reason"] == "credential_unbound"
    assert detail["request_id"]


def test_command_returns_sanitized_execution_failure(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "test-value")
    with patch.object(main, "run_agent", AsyncMock(side_effect=RuntimeError("secret must not leak"))):
        response = TestClient(main.app).post("/command", json={"input": "status"})
    assert response.status_code == 503
    detail = response.json()["detail"]
    assert detail["reason"] == "execution_failed"
    assert "secret" not in str(detail).lower()
    assert detail["request_id"]



def test_health_does_not_claim_readiness_from_key_presence(monkeypatch):
    monkeypatch.setenv('OPENAI_API_KEY', 'not-a-valid-key')
    data = TestClient(main.app).get('/health').json()
    assert data['status'] == 'unverified'
    assert data['evaluation'] == 'not_probed'


def test_failed_evaluation_returns_no_candidate(monkeypatch):
    monkeypatch.setenv('OPENAI_API_KEY', 'test-value')
    with patch.object(main, 'run_agent', AsyncMock(side_effect=main.EvaluationFailed('private candidate'))):
        response = TestClient(main.app).post('/command', json={'input': 'code'})
    assert response.status_code == 503
    assert response.json()['detail']['reason'] == 'self_evaluation_failed'
    assert 'private candidate' not in response.text


def test_cli_evaluation_failure_is_nonzero(monkeypatch, capsys):
    import pytest
    monkeypatch.setenv('OPENAI_API_KEY', 'test-value')
    monkeypatch.setattr(sys, 'argv', ['main.py', '--input', 'code'])
    with patch.object(main, 'run_agent', AsyncMock(side_effect=main.EvaluationFailed('candidate'))):
        with pytest.raises(SystemExit) as error:
            main.cli()
    assert error.value.code == 1
    assert 'candidate' not in capsys.readouterr().err
