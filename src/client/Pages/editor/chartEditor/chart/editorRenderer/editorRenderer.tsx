import HorizonalSelectFromArray from "Components/horizonalSelectFromArray/horizonalSelectFromArray";
import RangeInput from "Components/RangeInput/RangeInput";
import TranslateText from "Components/TranslateText/TranslateText";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import html2canvas from "html2canvas";
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
    const [quantize, setQuantize] = React.useState(4);
    const [isBeatBased, setIsBeatBased] = React.useState(true);
    const deferredScale = React.useDeferredValue(scale);
    const deferredQuantize = React.useDeferredValue(quantize);
    const [verticalAnchor, setVerticalAnchor] = React.useState<Array<number>>([]);
    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    const minimapRef = React.useRef<HTMLDivElement>(null)

    let beatCount = Math.ceil((chartProject.project.metadata.time || 60000) / (chartProject.project.metadata.bpm || 120) / 4)

    const setIsBasedSelect: selectContentsArray<boolean> = [
        { label: <TranslateText content="editor.chartEditor.chart.beatBase" />, value: true },
        { label: <TranslateText content="editor.chartEditor.chart.timeBase" />, value: false }
    ]

    function scrollCanvas(e: WheelEvent) {
        if (!canvasContainerRef.current) return;
        if (e.deltaY == 0) return;
        canvasContainerRef.current.scrollBy(e.deltaY, 0)
    }

    function updateMinimap() {
        captureEditor()
    }
    function captureEditor() {
        return new Promise((resolve,reject)=>{
            if (!canvasContainerRef.current) return;
            html2canvas(canvasContainerRef.current).then(canvas => {
                if (!minimapRef.current) return;
                minimapRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`
            }).catch(error => console.error(error))
        })
    }

    React.useEffect(() => {
        if (!canvasContainerRef.current) return;
        window.addEventListener("wheel", scrollCanvas)
        window.addEventListener("wheel", async()=>updateMinimap())
        return()=>{
            window.removeEventListener("wheel", scrollCanvas)
            window.removeEventListener("wheel", updateMinimap)
        }
    }, [])

    React.useEffect(() => {
        const array = []
        for (let i = 0; i < beatCount; i++) {
            const x = (96 * i) * scale + 16
            array.push(x)
            if (quantize != 1) {

                for (let i = 0; i < quantize - 1; i++) {
                    const deltaX = x + ((i + 1) * (96 / quantize * scale))
                    array.push(deltaX)
                }
            }

        }
        setVerticalAnchor(array)
    }, [scale, quantize])




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
                <div className={style.toolBarContent}>
                    <TranslateText content="editor.chartEditor.chart.positionBase" />
                    <HorizonalSelectFromArray contents={setIsBasedSelect} value={setIsBasedSelect[0]} onChange={(value) => setIsBeatBased(value.value)} />
                </div>
            </div>
            <div className={style.canvasContainer} ref={canvasContainerRef}>
                <div className={style.editorCanvas}>
                    <div className={style.vLineTextContainer}>
                        {
                            verticalAnchor.map((value, index) => {
                                let flag = index % quantize == 0 ? true : false;
                                if (quantize == 1) flag = true;
                                return (
                                    <>
                                        {flag ? <span className={style.vLineText} style={{ left: `${value}px` }} key={index}> {index / 4 + 1}</span> : <></>}
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className={style.lineContainer}>
                        <div className={style.vLineContainer}>
                            {
                                verticalAnchor.map((value, index) => {
                                    let flag = index % quantize == 0 ? true : false;
                                    if (quantize == 1) flag = true;
                                    return (
                                        <div className={`${style.verticalLine} ${flag ? style.baseLine : style.nonBaseLine}`} style={{ left: `${value}px` }} key={index} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={style.minimap} ref={minimapRef}></div>
                </div>
            </div>
        </div>
    )
}

export default ChartEditorRenderer;