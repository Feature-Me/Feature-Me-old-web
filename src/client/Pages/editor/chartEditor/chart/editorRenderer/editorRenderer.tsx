import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import * as PIXI from "pixi.js";
import React from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";

import style from "./editorRenderer.scss"

const ChartEditorRenderer:React.FC<{}> = (props) =>{
    const sceneChange = useSeneChangeNavigation();
    const [chartProject, setChartProject] = useRecoilState(chartProjectState);
    
    const editorContainerRef = React.useRef<HTMLDivElement>(null);

    return(
        <div className={style.editorRenderer}>
            <div className={style.sideBar}>

            </div>
            <div className={style.editorContainer} ref={editorContainerRef}>

            </div>
        </div>
    )
}

export default ChartEditorRenderer;