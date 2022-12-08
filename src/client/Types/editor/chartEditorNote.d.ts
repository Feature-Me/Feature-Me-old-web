interface chartEditorNote{
    type:"tap"|"damageTap"|"hold"|"bright"|"flick"|"seed"|"camera"|"speed"|"text"
    time:number
    lane:string|number
}
interface chartEditorHoldNote extends chartEditorNote {
    type:"hold"
    duration:number
}
interface chartEditorEditingNotesState {
    notes:Array<chartEditorNote>
    effects: Array<chartEditorNote>
    selected: Array<chartEditorNote>
}