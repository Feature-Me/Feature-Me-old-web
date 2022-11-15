import RangeInput from "Components/RangeInput/RangeInput";
import TranslateText from "Components/TranslateText/TranslateText";
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
    const [quantize,setQuantize] = React.useState(4);
    let beatCount = Math.ceil(chartProject.project.metadata.time / chartProject.project.metadata.bpm / 4)
    const verticalAnchor = React.useRef<Array<number>>([]);
    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (!canvasContainerRef.current) return;
        window.addEventListener("wheel", scrollCanvas)
    }, [])
    function scrollCanvas(e: WheelEvent) {
        if (!canvasContainerRef.current) return;
        if (e.deltaY == 0) return;
        canvasContainerRef.current.scrollBy(e.deltaY, 0)
    }


    return (
        <div className={style.editorRenderer}>
            <div className={style.sideBar}>
            </div>
            <div className={style.toolBar}>
                <div className={style.toolBarContent}>
                    <TranslateText content="editor.chartEditor.chart.scale" />
                    <RangeInput min={0.2} max={20} step={0.1} size="tiny" value={scale} onChange={value => setScale(value)} />
                </div>
                <div className={style.toolBarContent}>
                    <TranslateText content="editor.chartEditor.chart.quantize" />
                    <RangeInput min={1} max={64} step={1} size="tiny" value={quantize} onChange={value => setQuantize(value)} />
                </div>
            </div>
            <div className={style.canvasContainer} ref={canvasContainerRef}>
                <div className={style.editorCanvas}>
                    <div className={style.vLineContainer}>
                        {
                            (() => {
                                const array = []
                                for (let i = 0; i < beatCount; i++) {
                                    const x = (96 * i) * scale + 16
                                    array.push(x)
                                    if(quantize==1)return;
                                    for (let i = 0; i < quantize-1; i++) {
                                        const deltaX = x + ((i + 1) * (96/quantize * scale))
                                        array.push(deltaX)
                                    }
                                }
                                verticalAnchor.current = array;
                                return (
                                    array.map((value, index) => {
                                        let flag = index % quantize == 0 ? true : false

                                        return (
                                            <div className={`${style.verticalLine} ${flag ? style.base : style.nonBase}`} style={{ left: `${value}px` }} key={index}>
                                                {flag ? <span className={style.indexText}>{index / quantize + 1}</span> : <></>}
                                            </div>
                                        )
                                    })
                                )
                            })()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartEditorRenderer;