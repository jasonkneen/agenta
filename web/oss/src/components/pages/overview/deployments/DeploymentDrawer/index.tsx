// @ts-nocheck
import {useMemo, useState} from "react"

import {CloseOutlined, MoreOutlined, PythonOutlined} from "@ant-design/icons"
import {
    ArrowRight,
    ClockClockwise,
    CloudWarning,
    FileCode,
    FileTs,
    Rocket,
    Swap,
} from "@phosphor-icons/react"
import {Button, Drawer, DrawerProps, Dropdown, Space, Tabs, Tooltip, Typography} from "antd"
import clsx from "clsx"
import dynamic from "next/dynamic"
import {useRouter} from "next/router"

import fetchConfigcURLCode from "@/oss/code_snippets/endpoints/fetch_config/curl"
import fetchConfigpythonCode from "@/oss/code_snippets/endpoints/fetch_config/python"
import fetchConfigtsCode from "@/oss/code_snippets/endpoints/fetch_config/typescript"
import invokeLlmAppcURLCode from "@/oss/code_snippets/endpoints/invoke_llm_app/curl"
import invokeLlmApppythonCode from "@/oss/code_snippets/endpoints/invoke_llm_app/python"
import invokeLlmApptsCode from "@/oss/code_snippets/endpoints/invoke_llm_app/typescript"
import VariantPopover from "@/oss/components/pages/overview/variants/VariantPopover"
import {useAppsData} from "@/oss/contexts/app.context"
import {isDemo} from "@/oss/lib/helpers/utils"
import {useVariants} from "@/oss/lib/hooks/useVariants"
import {createParams} from "@/oss/pages/apps/[app_id]/endpoints"

import LanguageCodeBlock from "./assets/LanguageCodeBlock"
import {useStyles} from "./assets/styles"
import useURI from "./hooks/useURI"
import type {DeploymentDrawerProps} from "./types"

const DeploymentHistoryModal = dynamic(
    () => import("@/oss/components/pages/overview/deployments/DeploymentHistoryModal"),
)

const {Title, Text} = Typography

const DeploymentDrawer = ({
    variants,
    selectedEnvironment,
    loadEnvironments,
    setQueryEnv,
    setOpenChangeVariantModal,
    ...props
}: DeploymentDrawerProps & DrawerProps) => {
    const classes = useStyles()
    const router = useRouter()
    const appId = router.query.app_id as string
    const {currentApp} = useAppsData()
    const [selectedLang, setSelectedLang] = useState("python")
    const {data: uri} = useURI(appId, selectedEnvironment?.deployed_app_variant_id)
    const variant = useMemo(() => {
        return (
            (variants || []).find(
                (variant) => variant?.variantId === selectedEnvironment?.deployed_app_variant_id,
            ) || null
        )
    }, [variants, selectedEnvironment.deployed_app_variant_id])
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)

    const {data} = useVariants(currentApp)({appId}, [variant!].filter(Boolean))

    const params = useMemo(() => {
        const _variant = (data?.variants || []).find(
            (item) =>
                (item?.variant?.id || item?.variant?.variantId) ===
                selectedEnvironment.deployed_app_variant_revision_id,
        )
        const {inputParams, isChatVariant} = _variant || {}

        const params = createParams(
            inputParams,
            selectedEnvironment?.name || "none",
            "add_a_value",
            isChatVariant,
            currentApp,
        )

        return params
    }, [
        data?.variants,
        currentApp,
        selectedEnvironment.deployed_app_variant_revision_id,
        selectedEnvironment?.name,
    ])

    const invokeLlmAppCodeSnippet: Record<string, string> = {
        python: invokeLlmApppythonCode(uri!, params),
        bash: invokeLlmAppcURLCode(uri!, params),
        typescript: invokeLlmApptsCode(uri!, params),
    }

    const fetchConfigCodeSnippet: Record<string, string> = {
        python: fetchConfigpythonCode(currentApp?.app_name!, selectedEnvironment?.name!),
        bash: fetchConfigcURLCode(currentApp?.app_name!, selectedEnvironment?.name!),
        typescript: fetchConfigtsCode(currentApp?.app_name!, selectedEnvironment?.name!),
    }

    return (
        <>
            <Drawer
                width={720}
                {...props}
                destroyOnHidden
                closeIcon={null}
                title={
                    <Space className={classes.drawerTitleContainer}>
                        <Space className="gap-3">
                            <Button
                                onClick={() => props.onClose?.({} as any)}
                                type="text"
                                icon={<CloseOutlined />}
                            />
                            <Title>{selectedEnvironment?.name} environment</Title>
                        </Space>

                        {selectedEnvironment.deployed_variant_name && (
                            <Space direction="horizontal">
                                <Tooltip
                                    title={
                                        isDemo()
                                            ? ""
                                            : "History available in Cloud/Enterprise editions only"
                                    }
                                >
                                    <Button
                                        size="small"
                                        className="flex items-center gap-2"
                                        disabled={!isDemo()}
                                        onClick={() => setIsHistoryModalOpen(true)}
                                    >
                                        <ClockClockwise size={16} />
                                        View history
                                    </Button>
                                </Tooltip>
                                <Dropdown
                                    trigger={["hover"]}
                                    menu={{
                                        items: [
                                            {
                                                key: "change_variant",
                                                label: "Change Variant",
                                                icon: <Swap size={16} />,
                                                onClick: () => {
                                                    setOpenChangeVariantModal(true)
                                                    setQueryEnv("")
                                                },
                                            },
                                            {
                                                key: "open_playground",
                                                label: "Open in playground",
                                                icon: <Rocket size={16} />,
                                                onClick: () =>
                                                    router.push({
                                                        pathname: `/apps/${appId}/playground`,
                                                        query: {
                                                            revisions: JSON.stringify([
                                                                selectedEnvironment.deployed_app_variant_revision_id,
                                                            ]),
                                                        },
                                                    }),
                                            },
                                        ],
                                    }}
                                >
                                    <Button type="text" icon={<MoreOutlined />} size="small" />
                                </Dropdown>
                            </Space>
                        )}
                    </Space>
                }
            >
                {selectedEnvironment.deployed_variant_name ? (
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <Text className="font-[500]">Variant Deployed</Text>

                            {variant && (
                                <VariantPopover
                                    env={selectedEnvironment}
                                    selectedDeployedVariant={variant}
                                />
                            )}
                        </div>

                        <div
                            className={clsx([
                                "[&_.ant-tabs-nav]:sticky",
                                "[&_.ant-tabs-nav]:-top-[25px]",
                                "[&_.ant-tabs-nav]:bg-white",
                                "[&_.ant-tabs-nav]:z-[1]",
                            ])}
                        >
                            <Tabs
                                destroyInactiveTabPane
                                defaultActiveKey={selectedLang}
                                items={[
                                    {
                                        key: "python",
                                        label: "Python",
                                        children: (
                                            <LanguageCodeBlock
                                                fetchConfigCodeSnippet={fetchConfigCodeSnippet}
                                                invokeLlmAppCodeSnippet={invokeLlmAppCodeSnippet}
                                                selectedLang={selectedLang}
                                            />
                                        ),
                                        icon: <PythonOutlined />,
                                    },
                                    {
                                        key: "typescript",
                                        label: "TypeScript",
                                        children: (
                                            <LanguageCodeBlock
                                                fetchConfigCodeSnippet={fetchConfigCodeSnippet}
                                                invokeLlmAppCodeSnippet={invokeLlmAppCodeSnippet}
                                                selectedLang={selectedLang}
                                            />
                                        ),
                                        icon: <FileTs size={14} />,
                                    },
                                    {
                                        key: "bash",
                                        label: "cURL",
                                        children: (
                                            <LanguageCodeBlock
                                                fetchConfigCodeSnippet={fetchConfigCodeSnippet}
                                                invokeLlmAppCodeSnippet={invokeLlmAppCodeSnippet}
                                                selectedLang={selectedLang}
                                            />
                                        ),
                                        icon: <FileCode size={14} />,
                                    },
                                ]}
                                onChange={setSelectedLang}
                            />
                        </div>
                    </div>
                ) : (
                    <div className={classes.noDataContainer}>
                        <CloudWarning size={40} />

                        <Typography.Text>
                            No deployment has been done on {selectedEnvironment.name} environment
                        </Typography.Text>

                        <Button
                            className="flex items-center gap-2"
                            onClick={() => {
                                setOpenChangeVariantModal(true)
                                setQueryEnv("")
                            }}
                        >
                            Deploy now <ArrowRight size={14} />
                        </Button>
                    </div>
                )}
            </Drawer>

            <DeploymentHistoryModal
                open={isHistoryModalOpen}
                onCancel={() => setIsHistoryModalOpen(false)}
                setIsHistoryModalOpen={setIsHistoryModalOpen}
                selectedEnvironment={selectedEnvironment}
                variant={variant}
            />
        </>
    )
}

export default DeploymentDrawer
