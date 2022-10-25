import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";
import SelectBox from "Components/SelectBox/selectBox";
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
            <div className={style.view}>
                {/* Default Music Selector */}
                <div className={style.interaction}>
                    <h2><TranslateText content="editor.chartEditor.music.default" /></h2>
                    <SelectBox contents={[]} value={{ value: "", label: "" }} />
                </div>
                {/*Head text and add button*/}
                <div className={style.interaction}>
                    <h2><TranslateText content="editor.chartEditor.music.all" /> ({chartEditorProject.project.music.length})</h2>
                    <ChamferedButton><label htmlFor="editorMusicAddFileInput"><TranslateText content="editor.chartEditor.music.add" /></label></ChamferedButton>
                    <input type="file" id="editorMusicAddFileInput" accept="audio/*" hidden />
                </div>
                <div className={style.musicList}>

                </div>
            </div>
        </div>
    )
}

export default ChartEditorMusic;