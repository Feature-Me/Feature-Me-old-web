import * as PIXI from "pixi.js";
import React from "react";

import style from "./editorRenderer.scss"

const ChartEditorRenderer:React.FC<{}> = (props) =>{
    return(
        <div className={style.editorRenderer}>
            <div className={style.sideBar}>

            </div>
            <div className={style.canvasContainer}>

            </div>
        </div>
    )
}

export default ChartEditorRenderer;