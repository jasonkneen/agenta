import AddButton from "@/oss/components/Playground/assets/AddButton"

import PlaygroundPromptTool from "../PlaygroundPromptTool"

const PlaygroundPromptTools = () => {
    return (
        <section className="flex flex-col items-start gap-4">
            <PlaygroundPromptTool />
            <AddButton label="Tool" />
        </section>
    )
}

export default PlaygroundPromptTools
