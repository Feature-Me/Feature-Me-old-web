import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import * as PIXI from "pixi.js";
import React from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";

import style from "./editorRenderer.scss"

const ChartEditorRenderer: React.FC<{}> = (props) => {
    const sceneChange = useSeneChangeNavigation();
    const [chartProject, setChartProject] = useRecoilState(chartProjectState);
    const [scale, setScale] = React.useState(1);
    let beatCount = Math.ceil(chartProject.project.metadata.time / chartProject.project.metadata.bpm / 4)
    const anchorPos = [];
    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    const Application = new PIXI.Application(
        {
            backgroundColor: 0x414040,
        }
    )

    React.useEffect(() => {
        if (!canvasContainerRef.current) return;
        canvasContainerRef.current.appendChild(Application.view);
        setSize();
        setVerticalLine()
        window.addEventListener("wheel",scrollCanvas)
    }, [])
    function scrollCanvas(e:WheelEvent){
        if(!canvasContainerRef.current)return;
        if(e.deltaY==0)return;
        canvasContainerRef.current.scrollBy(e.deltaY,0)
    }
    function setSize() {
        if (!canvasContainerRef.current) return;
        
        Application.renderer.resize(beatCount*48+32||2000, canvasContainerRef.current.clientHeight)
    }

    function setVerticalLine(){
        
        //left and right margin : 16px
        for (let i = 0; i < beatCount; i++) {
            const x = 48 * i + 16
            const y = Application.renderer.height;
            const graphics = new PIXI.Graphics();
            graphics.lineStyle(2,0xaaaaaa);
            graphics.moveTo(x,16);
            graphics.lineTo(x,y-16);
            const style= new PIXI.TextStyle({
                fontSize: 12,
                fill:'#f5f5f5'
            });
            const text = new PIXI.Text(i+1, style);
            text.x = x
            text.y = 0
            Application.stage.addChild(graphics,text)
        }
    }

    return (
        <div className={style.editorRenderer}>
            <div className={style.sideBar}>

            </div>
            <div className={style.canvasContainer} ref={canvasContainerRef}>

            </div>
        </div>
    )
}

export default ChartEditorRenderer;