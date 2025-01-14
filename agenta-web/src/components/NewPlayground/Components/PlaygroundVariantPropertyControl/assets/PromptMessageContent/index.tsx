import clsx from "clsx"
import {Input} from "antd"
import {useState, useEffect, useCallback, ChangeEvent} from "react"
import {useDebounceInput} from "../../../../../../hooks/useDebounceInput"

import type {PromptMessageContentProps} from "./types"

const {TextArea} = Input

const PromptMessageContent = ({value, placeholder, onChange}: PromptMessageContentProps) => {
    const [localValue, setLocalValue] = useDebounceInput<string>(value, onChange, 300, "")

    const handleLocalValueChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setLocalValue(e.target.value)
        },
        [setLocalValue],
    )

    return (
        <TextArea
            rows={4}
            autoSize={{
                minRows: 4,
            }}
            placeholder={placeholder}
            className={clsx(["border-0", "focus:ring-0"])}
            value={localValue}
            onChange={handleLocalValueChange}
        />
    )
}

export default PromptMessageContent
