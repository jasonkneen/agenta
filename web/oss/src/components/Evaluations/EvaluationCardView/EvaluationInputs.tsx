import {Input, Typography} from "antd"
import {createUseStyles} from "react-jss"

import {EvaluationScenario} from "@/oss/lib/Types"

const useStyles = createUseStyles({
    root: {
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
    },
    inputRow: {
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        "& .ant-typography": {
            textTransform: "capitalize",
        },
        "& textarea": {
            width: "100%",
        },
    },
})

interface Props {
    evaluationScenario: EvaluationScenario
    onInputChange: Function
}

const EvaluationInputs: React.FC<Props> = ({evaluationScenario, onInputChange}) => {
    const classes = useStyles()

    return (
        <div className={classes.root} key={evaluationScenario.id}>
            {evaluationScenario.inputs.map((ip, ix) => (
                <div key={ip.input_name} className={classes.inputRow}>
                    <Typography.Text>{ip.input_name}:</Typography.Text>
                    <Input.TextArea
                        rows={2}
                        placeholder={ip.input_name}
                        defaultValue={ip.input_value}
                        onChange={(e) => onInputChange(e, evaluationScenario.id, ix)}
                    />
                </div>
            ))}
        </div>
    )
}

export default EvaluationInputs
