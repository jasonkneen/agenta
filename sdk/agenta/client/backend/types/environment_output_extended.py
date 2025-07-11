# This file was auto-generated by Fern from our API Definition.

import typing

import pydantic
from ..core.pydantic_utilities import IS_PYDANTIC_V2, UniversalBaseModel
from .environment_revision import EnvironmentRevision


class EnvironmentOutputExtended(UniversalBaseModel):
    name: str
    app_id: str
    project_id: str
    deployed_app_variant_id: typing.Optional[str] = None
    deployed_variant_name: typing.Optional[str] = None
    deployed_app_variant_revision_id: typing.Optional[str] = None
    revision: typing.Optional[int] = None
    revisions: typing.List[EnvironmentRevision]
    organization_id: typing.Optional[str] = None
    workspace_id: typing.Optional[str] = None

    if IS_PYDANTIC_V2:
        model_config: typing.ClassVar[pydantic.ConfigDict] = pydantic.ConfigDict(extra="allow", frozen=True)  # type: ignore # Pydantic v2
    else:

        class Config:
            frozen = True
            smart_union = True
            extra = pydantic.Extra.allow
