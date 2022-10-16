import Header from "Block/head/head";
import LinkWrapper from "Components/linkWrapper/linkWrapper";
import TranslateText from "Components/TranslateText/TranslateText";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import React from "react";
import { MdPlayArrow, MdSave } from "react-icons/md";
import { TbPackgeExport } from "react-icons/tb";
import { Route, useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import ChartEditorViewRouter from "Routs/editorRouter/chartEditor/chartEditorViewRouter";
import { chartProjectState } from "State/editor/chartProjectState";

import style from "./chartEditor.scss"

const ChartEditor: React.FC = () => {
    const navigate = useNavigate();
    const sceneChange = useSeneChangeNavigation();
    const [chartProject, setChartProject] = useRecoilState(chartProjectState);
    const lastSaved = React.useRef<number>(Date.now())

    const menuTabs: menuContentsArray = [
        { content: "editor.chartEditor.menuTab.overView", to: "./overview" },
        { content: "editor.chartEditor.menuTab.metadata", to: "./metadata" },
        { content: "editor.chartEditor.menuTab.music", to: "./music" },
        { content: "editor.chartEditor.menuTab.chart", to: "./chart" },
    ]

    React.useEffect(() => {
        let saveInterval: NodeJS.Timer;
        saveInterval = setInterval(() => {
            if(chartProject.saved) return;
            lastSaved.current = Date.now();
            //setChartProject(proj => { return { ...proj, project: { ...proj.project, metadata: { ...proj.project.metadata, saved: Date.now() } } } })
        }, 30000)

        return () => {
            clearInterval(saveInterval)
        }

    }, [])

    React.useEffect(()=>{
        setChartProject(proj=>{
            return{
                ...proj,
                saved:false
            }
        })
    },[chartProject.project])

    return (
        <div className={style.chartEditor}>
            <Header title="Chart Editor" backFunc={() => sceneChange(-2)} />
            <div className={style.head}>
                <h2>{chartProject.project.name}</h2>
                {/*space*/}
                <div></div>
                {/*page select tab*/}
                <div className={style.modeSelect}>
                    {
                        menuTabs.map((menu, index) => {
                            return (
                                <div className={style.tab} key={index} onClick={() => navigate(menu.to)}><TranslateText content={menu.content} /></div>
                            )
                        })
                    }
                </div>

                {/* save button */}
                <button className={`${style.save} ${style.headButton}`}>
                    <div className={style.iconWrapper}>
                        <MdSave />
                    </div>
                    <TranslateText content="editor.chartEditor.save" />
                </button>

                {/* export button */}
                <button className={`${style.export} ${style.headButton}`}>
                    <div className={style.iconWrapper}>
                        <TbPackgeExport />
                    </div>
                    <TranslateText content="editor.chartEditor.export" />
                </button>

                {/*test play button*/}
                <button className={`${style.testplay} ${style.headButton}`}>
                    <div className={style.iconWrapper}>
                        <MdPlayArrow />
                    </div>
                    <TranslateText content="editor.chartEditor.testPlay" />
                </button>

            </div>
            <div className={style.editorWrapper}>
                <ChartEditorViewRouter />
            </div>
            <div className={style.footer}>
                <span>{chartProject.saved ? "Saved" : "Unsaved changes"}</span>
            </div>
        </div>
    )
}

export default ChartEditor