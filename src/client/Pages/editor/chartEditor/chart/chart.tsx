import React from "react";
import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";
import SelectBox from "Components/SelectBox/selectBox";
import TranslateText from "Components/TranslateText/TranslateText";
import { Howl } from "howler";
import { cloneDeep } from "lodash";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { useRecoilState } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";
import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";

import style from "./chart.scss";

const ChartEditorChartEditPage: React.FC = () => {
    const [chartProject, setChartEditorProject] = useRecoilState(chartProjectState);
    const charts = chartProject.project.chart;

    return (
        <div className={style.editorPageView}>
            Chart Editor
        </div>
    )
}

export default ChartEditorChartEditPage;