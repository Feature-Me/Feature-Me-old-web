import Card from "Components/card/card";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { useRecoilValue } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";
import msToStringTime from "Utils/msToStringTime/msToStringTime";

import style from "./overview.scss";

const ChartEditorOverView: React.FC = () => {
    const chartEditorProject = useRecoilValue(chartProjectState);

    React.useEffect(()=>{
        document.title = `Editor - Overview - Feature Me`;
    },[])

    return (
        <div className={style.overview}>
            <h1><TranslateText content="editor.chartEditor.overView.title" /></h1>
            <div className={style.view}>
                {/* Preview page like music select */}
                <div className={style.preview}>
                    <h1>{chartEditorProject.project.name}</h1>
                    <h2>{chartEditorProject.project.metadata.composer}</h2>
                    <p>BPM:{chartEditorProject.project.metadata.bpm} , Time:{msToStringTime(chartEditorProject.project.metadata.time)} , <span className={style.license}>{chartEditorProject.project.metadata.license}</span></p>
                    <div className={style.image} />
                </div>
                <div className={style.stats}>
                    <h1><TranslateText content="editor.chartEditor.overView.stats.title" /></h1>
                    <div className={style.details}>
                        <h1><TranslateText content="editor.chartEditor.overView.stats.musics" />({chartEditorProject.project.music.length})</h1>
                        <h1><TranslateText content="editor.chartEditor.overView.stats.charts" />({chartEditorProject.project.chart.length})</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartEditorOverView