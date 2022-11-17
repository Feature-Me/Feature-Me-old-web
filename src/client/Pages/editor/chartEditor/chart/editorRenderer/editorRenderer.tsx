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
import getNearest from "Utils/getNearest/getNearest";

import style from "./editorRenderer.scss"

const ChartEditorRenderer: React.FC<{}> = (props) => {
    const sceneChange = useSeneChangeNavigation();
    const [chartProject, setChartProject] = useRecoilState(chartProjectState);
    const [scale, setScale] = React.useState(1);
    const [quantize, setQuantize] = React.useState(4);
    const [isBeatBased, setIsBeatBased] = React.useState(true);
    const [cursorPosX, setCurosrPosX] = React.useState(0);
    const [cursorPosY, setCurosrPosY] = React.useState(0)
    const deferredScale = React.useDeferredValue(scale);
    const deferredQuantize = React.useDeferredValue(quantize);
    const [verticalAnchor, setVerticalAnchor] = React.useState<Array<number>>([]);
    const [horizonalAnchor, setHorizonalAnchor] = React.useState<Array<{ name: string, position: number, type: string, lane: number | string }>>([]);
    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    const editorCanvasRef = React.useRef<HTMLDivElement>(null);
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

    function updateCursor(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const boundingBox = e.currentTarget.getBoundingClientRect();
        const x = e.pageX + e.currentTarget.scrollLeft - boundingBox.left - 96;
        const nearestX = getNearest(x, verticalAnchor)
        if (nearestX != 0) setCurosrPosX(nearestX);
        const y = (e.pageY - boundingBox.top) / boundingBox.height * 100
        const nearestY = getNearest(y, horizonalAnchor.map(a => a.position));
        if (nearestY != 0) setCurosrPosY(nearestY);
    }

    function setSize() {
        if (!editorCanvasRef.current) return;
        editorCanvasRef.current.style.width = `${(beatCount + 1) * 96 + 32}px`
        //beatCount * 96 + 32
    }

    React.useEffect(() => {
        if (!canvasContainerRef.current) return;
        setSize();
        window.addEventListener("wheel", scrollCanvas)
        return () => {
            window.removeEventListener("wheel", scrollCanvas)
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

    React.useEffect(() => {
        const map = [
            { name: "Seed Left", type: "seed", lane: "left" },
            { name: "Lane 1", type: "normal", lane: 1 },
            { name: "Lane 2", type: "normal", lane: 2 },
            { name: "Bright", type: "bright", lane: 0 },
            { name: "Lane 3", type: "normal", lane: 3 },
            { name: "Lane 4", type: "normal", lane: 4 },
            { name: "Seed Right", type: "seed", lane: "right" },
        ]
        const array = []
        for (let i = 0; i < map.length; i++) {
            array.push({ ...map[i], position: (i + 1) / (map.length + 1) * 100 })
        }
        setHorizonalAnchor(array);
    }, [])




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
            <div className={style.canvasContainer} ref={canvasContainerRef} onClick={updateCursor}>
                <div className={style.editorCanvas} ref={editorCanvasRef}>
                    <div className={style.vLineTextContainer}>
                        {
                            verticalAnchor.map((value, index) => {
                                let flag = index % quantize == 0 ? true : false;
                                if (quantize == 1) flag = true;
                                if (flag) return <span className={style.vLineText} style={{ left: `${value}px` }} key={index}>{index / quantize + 1}</span>
                                return null
                            })
                        }
                    </div>
                    <div className={style.hLineTextContainer}>
                        {
                            horizonalAnchor.map((value, index) => {
                                return <span className={style.hLineText} key={index}>{value.name}({value.lane})</span>
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
                        <div className={style.hLineContainer}>
                            {
                                horizonalAnchor.map((value, index) => {
                                    return (
                                        <div className={style.horizonalLine} style={{ top: `${value.position}%` }} key={index} />
                                    )
                                })
                            }
                        </div>

                        <div className={style.cursorLineContainer}>
                            <div className={`${style.cursorVLine} ${style.cursorLine}`} style={{ left: `${cursorPosX}px` }}></div>
                            <div className={`${style.cursorHLine} ${style.cursorLine}`} style={{ top: `${cursorPosY}%` }}></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartEditorRenderer;