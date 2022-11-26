import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";
import chartEditorEditingNotesState from "State/editor/editorState";

import style from "./propertyEditor.scss";

const PropertyOverView: React.FC<{ current: chartEditorChart, setCurrent: React.Dispatch<React.SetStateAction<chartEditorChart>> }> = (props) => {

    const [mode, setMode] = React.useState("overview");
    const chartEditorEditingNotes = useRecoilValue(chartEditorEditingNotesState);

    return (
        <div className={style.propertyEditor}>
            <h4>Chart Overview</h4>
        </div>
    )
}

export default PropertyOverView