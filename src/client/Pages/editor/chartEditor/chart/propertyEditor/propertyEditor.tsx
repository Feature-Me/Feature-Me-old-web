import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import ChartEditorChartPropertyRouter from "Routs/editorRouter/chartEditor/chartEditorPropertyRouter";
import { chartProjectState } from "State/editor/chartProjectState";
import chartEditorEditingNotesState from "State/editor/editorState";

import style from "./propertyEditor.scss";

const PropertyEditor: React.FC<{ current: chartEditorChart, setCurrent: React.Dispatch<React.SetStateAction<chartEditorChart>> }> = (props) => {
    const [mode, setMode] = React.useState("overview");
    const chartEditorEditingNotes = useRecoilValue(chartEditorEditingNotesState);

    const menuTabs: menuContentsArray = [
        { content: "editor.chartEditor.chart.properties.overView", to: "./" },
        { content: "editor.chartEditor.chart.properties.note", to: "./note" },
    ]

    return (
        <div className={style.propertyEditor}>
            <h2>{props.current.name}</h2>
            <div className={style.tab} >
                {
                    menuTabs.map(menu => {
                        return (
                            <Link to={menu.to}>
                                <div className={style.tabContent} key={menu.to}>
                                    <TranslateText content={menu.content} />
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div>
                <ChartEditorChartPropertyRouter {...props} />
            </div>
        </div>
    )
}

export default PropertyEditor