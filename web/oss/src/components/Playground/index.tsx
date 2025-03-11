import {useMemo} from "react"

import {Spin, Typography} from "antd"
import dynamic from "next/dynamic"
import {useRouter} from "next/router"

import {useApps} from "@/oss/contexts/app.context"
import {ListAppsItem} from "@/oss/lib/Types"

const NewPlayground = dynamic(() => import("../NewPlayground/Playground"), {ssr: false})
const OldPlayground = dynamic(() => import("../OldPlayground/Playground"), {ssr: false})

const PlaygroundRouter = () => {
    const router = useRouter()
    const appId = router.query.app_id
    const {isLoading, data} = useApps()

    const app = useMemo(() => {
        return (data || [])?.find((item: ListAppsItem) => item.app_id === appId)
    }, [appId, data])

    if (isLoading) {
        return (
            <div className="w-full h-[calc(100dvh-70px)] flex items-center justify-center">
                <div className="flex gap-2 items-center justify-center">
                    <Spin spinning={true} />
                    <Typography className="text-[16px] leading-[18px] font-[600]">
                        Loading
                    </Typography>
                </div>
            </div>
        )
    } else if (app) {
        if (!app.app_type || app.app_type.includes(" (old)")) {
            return <OldPlayground />
        } else {
            if (!router.query.playground) {
                router.replace(
                    {query: {...router.query, playground: "new-playground"}},
                    undefined,
                    {shallow: false},
                )
            }
            return <NewPlayground />
        }
    } else {
        return null
    }
}

export default PlaygroundRouter
