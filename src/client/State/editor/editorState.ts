import { atom } from "recoil";

const defaultChartEditingNotesState:chartEditorEditingNotesState = {
    notes:[],
    effects:[],
    selected:[]
}
const chartEditorEditingNotesState = atom({
    key: "chartEditorEditingState",
    default: defaultChartEditingNotesState
})

export default chartEditorEditingNotesState;
