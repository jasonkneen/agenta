import {memo} from "react"
import dynamic from "next/dynamic"
import clsx from "clsx"
import PlaygroundVariantConfig from "../PlaygroundVariantConfig"
import type {PlaygroundVariantProps} from "./types"
import PlaygroundGenerations from "../PlaygroundGenerations"

const Splitter = dynamic(() => import("antd").then((mod) => mod.Splitter), {ssr: false})
const SplitterPanel = dynamic(() => import("antd").then((mod) => mod.Splitter.Panel), {ssr: false})
const PlaygroundVariantHistory = dynamic(() => import("../PlaygroundVariantHistory"), {ssr: false})

/**
 * PlaygroundVariant renders a single variant instance in the playground.
 *
 * Features:
 * - Splits the view between configuration and generation panels
 * - Handles variant configuration through PlaygroundVariantConfig
 * - Provides resizable panels using Splitter
 *
 * @component
 * @example
 * ```tsx
 * <PlaygroundVariant variantId="variant-123" />
 * ```
 */
const PlaygroundVariant: React.FC<PlaygroundVariantProps> = ({
    variantId,
    className,
    ...divProps
}) => {
    return (
        <div className={clsx("flex flex-col grow h-full overflow-hidden", className)} {...divProps}>
            <div className="w-full max-h-full h-full grow relative overflow-hidden">
                <Splitter className="h-full">
                    <SplitterPanel defaultSize="40%" min="20%" max="70%" className="!h-full">
                        <PlaygroundVariantConfig variantId={variantId} />
                    </SplitterPanel>
                    <SplitterPanel className="!h-full">
                        <PlaygroundGenerations />
                        {/* <PlaygroundVariantHistory variantId={variantId} /> */}
                    </SplitterPanel>
                </Splitter>
            </div>
        </div>
    )
}

export default memo(PlaygroundVariant)
