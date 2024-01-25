# This file was auto-generated by Fern from our API Definition.

import datetime as dt
import typing

from ..core.datetime_utils import serialize_datetime
from .human_evaluation_scenario_input import HumanEvaluationScenarioInput
from .human_evaluation_scenario_output import HumanEvaluationScenarioOutput
from .human_evaluation_scenario_score import HumanEvaluationScenarioScore

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore


class HumanEvaluationScenario(pydantic.BaseModel):
    id: typing.Optional[str]
    evaluation_id: str
    inputs: typing.List[HumanEvaluationScenarioInput]
    outputs: typing.List[HumanEvaluationScenarioOutput]
    vote: typing.Optional[str]
    score: typing.Optional[HumanEvaluationScenarioScore]
    evaluation: typing.Optional[str]
    correct_answer: typing.Optional[str]
    is_pinned: typing.Optional[bool]
    note: typing.Optional[str]

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {
            "by_alias": True,
            "exclude_unset": True,
            **kwargs,
        }
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults: typing.Any = {
            "by_alias": True,
            "exclude_unset": True,
            **kwargs,
        }
        return super().dict(**kwargs_with_defaults)

    class Config:
        frozen = True
        smart_union = True
        json_encoders = {dt.datetime: serialize_datetime}
