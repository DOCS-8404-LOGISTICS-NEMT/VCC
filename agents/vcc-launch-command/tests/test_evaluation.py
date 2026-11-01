import sys
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import AsyncMock, patch
import asyncio
import pytest
from pydantic import ValidationError
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import agent
from evaluation import Evaluation, EvaluationFailed


def review(failed=None):
    return Evaluation(**{name: {'passed': name != failed, 'evidence': 'Compared with supplied evidence.'}
        for name in ('autonomy', 'verification', 'retention', 'precision')},
        corrections=['Remove unsupported completion claim.'] if failed else [])


def result(value):
    return SimpleNamespace(final_output=value)


def test_pass_is_evaluated_and_audited():
    run = AsyncMock(side_effect=[result('Draft'), result(review())])
    with patch.object(agent.Runner, 'run', run):
        output = asyncio.run(agent.run_agent('Prepare code'))
    assert 'SELF-EVALUATION — PASS' in output
    assert run.await_count == 2


@pytest.mark.parametrize('failed', ['autonomy', 'verification', 'retention', 'precision'])
def test_each_failed_check_triggers_correction(failed):
    run = AsyncMock(side_effect=[result('bad'), result(review(failed)), result('corrected'), result(review())])
    with patch.object(agent.Runner, 'run', run):
        output = asyncio.run(agent.run_agent('Preserve corrected requirements'))
    assert output.startswith('corrected')
    assert 'reviewed drafts: 2' in output
    assert 'Preserve corrected requirements' in run.await_args_list[2].args[1]


def test_exhausted_reviews_never_return_failed_candidate():
    run = AsyncMock(side_effect=[result('bad'), result(review('verification'))] * 3)
    with patch.object(agent.Runner, 'run', run), pytest.raises(EvaluationFailed):
        asyncio.run(agent.run_agent('Review'))
    assert run.await_count == 6


def test_invalid_review_is_rejected():
    with patch.object(agent.Runner, 'run', AsyncMock(side_effect=[result('bad'), result('PASS')])):
        with pytest.raises(EvaluationFailed):
            asyncio.run(agent.run_agent('Review'))


def test_blank_input_does_not_call_model():
    with patch.object(agent.Runner, 'run', AsyncMock()) as run:
        with pytest.raises(ValueError):
            asyncio.run(agent.run_agent('  '))
        run.assert_not_called()


def test_missing_and_string_grades_are_rejected():
    with pytest.raises(ValidationError):
        Evaluation(autonomy={'passed': 'false', 'evidence': 'x'}, corrections=[])


def test_corrections_cannot_coexist_with_pass():
    r = review()
    r.corrections = ['Unresolved error']
    assert not r.passed
