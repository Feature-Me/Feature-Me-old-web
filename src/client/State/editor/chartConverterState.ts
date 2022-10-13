import { atom } from "recoil";

const defaultChartConverterState: chartConverterType = {
    chartText: "",
    inputFileName: "",
    convertType: "",
    convertDirection: false,
    resultText: ""
}

const chartConverterState = atom({
    key: "chartConverterState",
    default: defaultChartConverterState
})

export default chartConverterState;