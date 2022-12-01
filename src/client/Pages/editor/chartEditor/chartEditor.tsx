import Header from "Block/head/head";
import LinkWrapper from "Components/linkWrapper/linkWrapper";
import TranslateText from "Components/TranslateText/TranslateText";
import saveChartProject from "Features/editor/chartEditor/save/saveChart";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import React from "react";
import { MdPlayArrow, MdSave } from "react-icons/md";
import { TbPackgeExport } from "react-icons/tb";
import { Route, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import ChartEditorViewRouter from "Routs/editorRouter/chartEditor/chartEditorViewRouter";
import { chartProjectState } from "State/editor/chartProjectState";

import style from "./chartEditor.scss"

const ChartEditor: React.FC = () => {
    const navigate = useNavigate();
    const sceneChange = useSeneChangeNavigation();
    const [chartProject, setChartProject] = useRecoilState(chartProjectState);


    const menuTabs: menuContentsArray = [
        { content: "editor.chartEditor.menuTab.overView", to: "./overview" },
        { content: "editor.chartEditor.menuTab.metadata", to: "./metadata" },
        { content: "editor.chartEditor.menuTab.music", to: "./music" },
        { content: "editor.chartEditor.menuTab.chart", to: "./chart" },
        { content: "Docs", to: "./docs" }
    ]

    React.useEffect(() => {
        let saveInterval: NodeJS.Timer;
        saveInterval = setInterval(() => {
            if (chartProject.saved) return;
            saveChartProject(chartProject.project);
        }, 30000)

        return () => {
            clearInterval(saveInterval)
        }

    }, [])


    return (
        <div className={style.chartEditor}>
            <Header title="Chart Editor" backFunc={() => sceneChange("../../../editor")} />
            <div className={style.head}>
                <h2>{chartProject.project.name}</h2>
                {/*space*/}
                <div></div>
                {/*page select tab*/}
                <div className={style.modeSelect}>
                    {
                        menuTabs.map(menu => {
                            return (
                                <Link to={menu.to} key={menu.to}>
                                    <div className={style.tabContent}  /* onClick={() => navigate(menu.to)} */><TranslateText content={menu.content} /></div>
                                </Link>
                            )
                        })
                    }
                </div>

                {/* save button */}
                <button className={`${style.save} ${style.headButton}`} onClick={() => saveChartProject(chartProject.project)}>
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
                {
                    chartProject.statusbar.map((status, index) => {
                        return (
                            <span onClick={() => { if (status.onClick) status.onClick() }}>{status.label}</span>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChartEditor