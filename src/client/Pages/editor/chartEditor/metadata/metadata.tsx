import Card from "Components/card/card";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { useRecoilValue } from "recoil";
import AceEditor from "react-ace";
import { Ace } from "ace-builds";
import { chartProjectState } from "State/editor/chartProjectState";
import msToStringTime from "Utils/msToStringTime/msToStringTime";

import style from "./metadata.scss";
import json5 from "json5";

const ChartEditorMetadata: React.FC = () => {
    const chartEditorProject = useRecoilValue(chartProjectState);
    let inputEditor: Ace.Editor;


    React.useEffect(() => {

        document.title = `Editor - Metadata - Feature Me`;
    }, [])

    return (
        <div className={style.metadata}>
            <h1><TranslateText content="editor.chartEditor.metadata.title" /></h1>
            <div className={style.metadataEdit}>
                <div className={style.visualEdit}>

                </div>
                <AceEditor mode="json5" fontSize={14} theme="monokai" value={json5.stringify(chartEditorProject.project.metadata,null,4)} height="100%" width="100%" />
            </div>
        </div>
    )
}

export default ChartEditorMetadata