import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { useRecoilState } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";

import style from "./music.scss";

const ChartEditorMusic: React.FC = () => {
    const [chartEditorProject, setChartEditorProject] = useRecoilState(chartProjectState);
    return (
        <div className={style.music}>
            <h1><TranslateText content="editor.chartEditor.music.title" /></h1>
        </div>
    )
}

export default ChartEditorMusic;