import DynamicCodeBlock from "@/components/DynamicCodeBlock/DynamicCodeBlock"

import pythonCode from "../../../../../../code_snippets/testsets/create_with_json/python"
import cURLCode from "../../../../../../code_snippets/testsets/create_with_json/curl"
import tsCode from "../../../../../../code_snippets/testsets/create_with_json/typescript"

import pythonCodeUpload from "../../../../../../code_snippets/testsets/create_with_upload/python"
import cURLCodeUpload from "../../../../../../code_snippets/testsets/create_with_upload/curl"
import tsCodeUpload from "../../../../../../code_snippets/testsets/create_with_upload/typescript"
import {Typography} from "antd"
import {useRouter} from "next/router"

export default function NewTestSetWithAPI() {
    const router = useRouter()
    const appName = router.query.app_name?.toString() || ""

    const uploadURI = `${process.env.NEXT_PUBLIC_AGENTA_API_URL}/api/datasets/upload`
    const jsonURI = `${process.env.NEXT_PUBLIC_AGENTA_API_URL}/api/datasets/${appName}`

    const params = `{
    "name": "testset_name",}`

    const codeSnippets: Record<string, string> = {
        Python: pythonCode(jsonURI, params),
        cURL: cURLCode(jsonURI, params),
        TypeScript: tsCode(jsonURI, params),
    }

    const codeSnippetsUpload: Record<string, string> = {
        Python: pythonCodeUpload(uploadURI, appName),
        cURL: cURLCodeUpload(uploadURI, appName),
        TypeScript: tsCodeUpload(uploadURI, appName),
    }
    return (
        <div>
            <Typography.Title level={5} style={{marginBottom: "20px"}}>
                Create a new Test Set with JSON
            </Typography.Title>
            <DynamicCodeBlock codeSnippets={codeSnippets} />
            <Typography.Title level={5} style={{marginBottom: "20px"}}>
                Create a new Test Set with uploading a CSV file
            </Typography.Title>
            <DynamicCodeBlock codeSnippets={codeSnippetsUpload} />
        </div>
    )
}
