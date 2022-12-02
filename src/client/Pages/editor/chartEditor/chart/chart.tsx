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
import ChartEditorRenderer from "./editorRenderer/editorRenderer";
import PropertyEditor from "./propertyEditor/propertyEditor";
import chartEditorEditingNotesState from "State/editor/editorState";
import json5 from "json5";

const ChartEditorChartEditPage: React.FC = () => {
    const [chartProject, setChartEditorProject] = useRecoilState(chartProjectState);
    const [chartEditorEditingNotes,setChartEditorEditingNotes] = useRecoilState(chartEditorEditingNotesState);
    const charts = chartProject.project.chart;
    const [current, setCurrent] = React.useState(charts[0]);


    React.useEffect(() => {
        document.title = `Editor - Chart(${current.name}) - Feature Me`
        
    }, [])

    React.useEffect(()=>{
        setChartEditorEditingNotes(chart => {
            const notes = json5.parse(chartProject.project.chart.find(c => c.id == current.id)?.data || "{}")
            return {
                ...chart,
                ...notes
            }
        })
        return()=>{
            // brfore change chart, save to chartProject state
            setChartEditorProject(proj=>{
                let newCharts = cloneDeep(proj.project.chart);
                const index = newCharts.findIndex(c=>c.id==current.id);
                newCharts[index] = current;
                return{
                    ...proj,
                    project:{
                        ...proj.project,
                        chart:newCharts
                    }
                }
            })
        }
    },[current.id])

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
                        <ChartEditorRenderer {...{current,setCurrent}} />
                    <PropertyEditor {...{current,setCurrent}} />
                    </div>
            </div>
        </div>
    )
}

export default ChartEditorChartEditPage;