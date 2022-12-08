import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";
import chartEditorEditingNotesState from "State/editor/editorState";

import style from "./propertyEditor.scss";

const PropertyOverView: React.FC<{ current: chartEditorChart, setCurrent: React.Dispatch<React.SetStateAction<chartEditorChart>> }> = (props) => {
    const chartEditorEditingNotes = useRecoilValue(chartEditorEditingNotesState);

    return (
        <div className={style.overView}>
            <h4>Chart Overview</h4>
            <p>Notes: {}</p>
        </div>
    )
}

export default PropertyOverView