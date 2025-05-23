import {ReactNode} from "react"

import {ExclamationCircleOutlined} from "@ant-design/icons"
import {Modal, ModalFuncProps} from "antd"
import {HookAPI} from "antd/es/modal/useModal"

import {getAppValues} from "@/oss/contexts/app.context"
import {globalErrorHandler} from "@/oss/lib/helpers/errorHandler"

function handleCb(cb: AlertPopupProps["onOk"]) {
    if (typeof cb !== "function") return cb
    return function () {
        const res = cb()
        if (res instanceof Promise) {
            return new Promise((_res) => {
                res.catch(globalErrorHandler).finally(() => _res(undefined))
            })
        }
        return res
    }
}

export type AlertPopupProps = ModalFuncProps & {
    message: ReactNode
    cancellable?: boolean
    type?: keyof HookAPI
}

export default function AlertPopup({
    title,
    message,
    okText = "Yes",
    cancelText = "Cancel",
    onOk,
    onCancel,
    cancellable = true,
    type,
    ...ModalProps
}: AlertPopupProps) {
    const {modalInstance} = getAppValues()
    const modal = modalInstance || Modal

    return modal[type || "confirm"]({
        title,
        content: message,
        okText,
        cancelText,
        onOk: handleCb(onOk),
        onCancel: handleCb(onCancel),
        closable: cancellable,
        maskClosable: cancellable,
        cancelButtonProps: {
            style: cancelText === null ? {display: "none"} : undefined,
        },
        icon: <ExclamationCircleOutlined />,
        okType: "default",
        ...ModalProps,
    })
}
