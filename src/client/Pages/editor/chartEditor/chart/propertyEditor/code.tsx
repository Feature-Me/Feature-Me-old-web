import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";
import chartEditorEditingNotesState from "State/editor/editorState";

import AceEditor from "react-ace";
import { Ace } from "ace-builds";

import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/snippets/json5";
import "ace-builds/src-noconflict/theme-monokai";

import style from "./propertyEditor.scss";
import json5 from "json5";

const PropertyCodeView: React.FC<{ current: chartEditorChart, setCurrent: React.Dispatch<React.SetStateAction<chartEditorChart>> }> = (props) => {
    const chartEditorEditingNotes = useRecoilValue(chartEditorEditingNotesState);
    const [chartProject, setChartEditorProject] = useRecoilState(chartProjectState);
    let inputEditor = React.useRef<Ace.Editor>();
    const charts = chartProject.project.chart;
    return (
        <div className={style.codeEditor}>
            <AceEditor mode="json5"
                fontSize={14}
                theme="monokai"
                onLoad={e => inputEditor.current = e}
                value={""}
                onChange={()=>{}}
                height="100%" width="100%" />
        </div>
    )
}

export default PropertyCodeView