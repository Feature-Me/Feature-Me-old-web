import { atom } from "recoil";

const defaultChartEditingNotesState: Array<chartEditorNote> = []
const chartEditorEditingNotesState = atom({
    key: "chartConverterState",
    default: defaultChartEditingNotesState
})

export default chartEditorEditingNotesState;