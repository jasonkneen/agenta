# This file was auto-generated by Fern from our API Definition.

import typing
from ...types.o_tel_spans_response import OTelSpansResponse
from ...types.agenta_nodes_response import AgentaNodesResponse
from ...types.agenta_trees_response import AgentaTreesResponse
from ...types.agenta_roots_response import AgentaRootsResponse

QueryTracesResponse = typing.Union[
    OTelSpansResponse, AgentaNodesResponse, AgentaTreesResponse, AgentaRootsResponse
]
