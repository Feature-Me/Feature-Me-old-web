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
    const [current, setCurrent] = React.useState(charts[0]);


    React.useEffect(() => {
        document.title = `Editor - Chart(${current.name}) - Feature Me`
    }, [])

    return (
        <div className={style.editorPageView}>
            <h1><TranslateText content="editor.chartEditor.chart.title" end={`(${current.name})`} /></h1>
            <div className={style.view}>
                {/* Chart files tab*/}
                <div className={style.tab}>
                    {
                        charts.map((chart,index) => {
                            return (
                                <div key={chart.id} className={style.tabContent} onClick={() => setCurrent(charts[index])}>
                                    {chart.name}
                                    </div>
                            )
                        })
                    }
                </div>
                    <div className={style.editor}>
                        
                    </div>
            </div>
        </div>
    )
}

export default ChartEditorChartEditPage;