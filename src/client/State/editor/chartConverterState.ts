import { atom } from "recoil";

const defaultChartConverterState:chartConverterStateTyoe = {
    chartText: "",
    inputFileName: "",
    convertType: "",
    convertDirection: false,
    resultText: ""
}

const chartConverterState = atom({
    key:"chartConverterState",
    default:defaultChartConverterState
})

export default chartConverterState;