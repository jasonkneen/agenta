import {memo, useMemo} from "react"

import {Timer, PlusCircle} from "@phosphor-icons/react"
import {Tag, Space} from "antd"
import clsx from "clsx"

import StatusRenderer from "@/oss/components/pages/observability/components/StatusRenderer"
import ResultTag from "@/oss/components/ResultTag/ResultTag"
import {formatCurrency, formatLatency, formatTokenUsage} from "@/oss/lib/helpers/formatters"
import {NodeStatusCode, NodeStatusDTO} from "@/oss/services/observability/types"

import TraceDrawerButton from "../../../Drawers/TraceDrawer"

import {GenerationResultUtilsProps} from "./types"

const GenerationResultUtils: React.FC<GenerationResultUtilsProps> = ({className, result}) => {
    const tree = result?.response?.tree
    const metric = tree?.nodes?.[0]?.metrics?.acc
    const status = result?.error
        ? {
              code: NodeStatusCode.ERROR,
          }
        : (tree?.nodes?.[0]?.status as NodeStatusDTO)
    const durations = metric?.duration?.total
    const tokens = metric?.tokens?.total
    const costs = metric?.costs?.total
    const prompts = metric?.tokens?.prompt
    const completions = metric?.tokens?.completion

    const formattedPrompts = useMemo(() => formatTokenUsage(prompts), [prompts])
    const formattedCompletions = useMemo(() => formatTokenUsage(completions), [completions])
    const formattedTokens = useMemo(() => formatTokenUsage(tokens), [tokens])
    const formattedLatency = useMemo(
        () => formatLatency(durations ? durations / 1000 : null),
        [durations],
    )
    const formattedCosts = useMemo(() => formatCurrency(costs), [costs])

    return (
        <div className={clsx("flex items-center gap-1", className)}>
            <TraceDrawerButton result={result} size="small" className="!mr-1" type="default" />

            <StatusRenderer status={status} />

            <Tag color="default" bordered={false} className="flex items-center gap-1">
                <Timer size={14} /> {formattedLatency}
            </Tag>

            <ResultTag
                color="default"
                bordered={false}
                value1={
                    <div className="flex items-center gap-1">
                        <PlusCircle size={14} /> {formattedTokens} / {formattedCosts}
                    </div>
                }
                popoverContent={
                    <Space direction="vertical">
                        <Space>
                            <div>{formattedPrompts}</div>
                            <div>Prompt tokens</div>
                        </Space>
                        <Space>
                            <div>{formattedCompletions}</div>
                            <div>Completion tokens</div>
                        </Space>
                    </Space>
                }
            />
        </div>
    )
}

export default memo(GenerationResultUtils)
