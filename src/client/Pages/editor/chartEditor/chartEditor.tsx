import Header from "Block/head/head";
import LinkWrapper from "Components/linkWrapper/linkWrapper";
import TranslateText from "Components/TranslateText/TranslateText";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import React from "react";
import { MdPlayArrow } from "react-icons/md";
import { Route, useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import ChartEditorViewRouter from "Routs/editorRouter/chartEditor/chartEditorViewRouter";
import { chartProjectState } from "State/editor/chartProjectState";

import style from "./chartEditor.scss"

const ChartEditor: React.FC = () => {
    const navigate = useSeneChangeNavigation();
    const [chartProject,setChartProject] = useRecoilState(chartProjectState);

    const menuTabs: menuContentsArray = [
        { content: "editor.chartEditor.menuTab.overView", to: "./overview" },
        { content: "editor.chartEditor.menuTab.metadata", to: "./metadata" },
        { content: "editor.chartEditor.menuTab.music", to: "./music" },
        { content: "editor.chartEditor.menuTab.chart", to: "./chart" },
    ]

    return (
        <div className={style.chartEditor}>
            <Header title="Chart Editor" backFunc={()=>navigate(-2)} />
            <div className={style.head}>
                <h2>{chartProject.project.name}</h2>
                {/*space*/}
                <div></div>
                {/*page select tab*/}
                <div className={style.modeSelect}>
                    {
                        menuTabs.map((menu, index) => {
                            return (
                                <div className={style.tab} key={index} onClick={()=>navigate(menu.to)}><TranslateText content={menu.content} /></div>
                            )
                        })
                    }
                </div>
                {/*test play button*/}
                <button className={style.testplay}>
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

            </div>
        </div>
    )
}

export default ChartEditor