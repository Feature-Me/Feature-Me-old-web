import Header from "Block/head/head";
import LinkWrapper from "Components/linkWrapper/linkWrapper";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

import databaseInfo from "Config/databaseinfo.json";
import style from "./startPage.scss"
import msToStringTime from "Utils/msToStringTime/msToStringTime";
import createNewProject from "Utils/createNewEditorProject/createChart";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";

const EditorStartPage: React.FC = () => {
    const navigate = useSeneChangeNavigation();
    const [projects, setProjects] = React.useState<editorVisibleProjects>([])

    const newProjectMenu: menuContentsArray = [
        { content: "editor.projects.newChart", to: "./new/chart" },
        { content: "editor.projects.convertChart", to: "./chartconverter" },
        { content: "editor.projects.newBehavior", to: "./new/behavior" }
    ]

    const getProject = React.useMemo(async () => {
        let projectsData: editorVisibleProjects = []
        await new Promise<void>((resolve, reject) => {
            const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
            dbOpenRequest.onsuccess = () => {
                const db = dbOpenRequest.result;
                const editorStore = db.transaction(databaseInfo.editorStore, "readwrite").objectStore(databaseInfo.editorStore)
                const allProject = editorStore.getAll()
                allProject.onsuccess = () => {
                    const projects = allProject.result
                    for (let i = 0; i < projects.length; i++) {
                        const project = projects[i] as getEditorProject;
                        const url = project.type == "chart" ? "charteditor" : "";
                        const to = `./${url}/${project.id}`
                        console.log(project);
                        
                        const data = {
                            name: project.name,
                            id: project.id,
                            saved: project.metadata.saved,
                            to: to,
                            type:project.type
                        }
                        projectsData.push(data)
                    }
                    resolve()
                }
            }
        })
        return projectsData;
    }, [])

    function newChartProject(){
        createNewProject().then(id=>{
            navigate(`./charteditor/${id}`)
        })
    }

    React.useEffect(() => {
        document.title = `Editor - Feature Me`;
        (async () => {
            const projects = await getProject;
            if (projects.length != 0) {
                setProjects(projects);
            }

        })()
    }, [])

    return (
        <div className={style.editorStart}>
            <Header title="Editor" />
            <div className={style.startPage}>
                <h1><TranslateText content="editor.start" /></h1>
                <div className={style.projectSelect}>
                    <div className={style.newproject}>
                        <h2><TranslateText content="editor.projects.new" /></h2>
                        {/*select project type*/}
                        <div className={style.contentWrapper}>
                            {
                                newProjectMenu.map((menu, index) => {
                                    return (
                                            <div className={style.newprojectCard} onClick={newChartProject} key={index}>
                                                <h2><TranslateText content={menu.content} /></h2>
                                            </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={style.allproject}>
                        <h2><TranslateText content="editor.projects.open" /></h2>
                        <div className={style.contentWrapper}>
                            {
                                projects.map(project => {
                                    const basePath = project.type == "chart"?"charteditor":"";
                                    return (
                                        <LinkWrapper to={`./${basePath}/${project.id}`} key={project.id}>
                                            <div className={style.projectCard}>
                                                <span>{project.type}</span>
                                                <h2>{project.name}</h2>
                                                <p>Last Saved:{new Date(project.saved).toLocaleString()} / {project.id}</p>
                                            </div>
                                        </LinkWrapper>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditorStartPage