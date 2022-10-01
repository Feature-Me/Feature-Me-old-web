import Header from "Block/head/head";
import LinkWrapper from "Components/linkWrapper/linkWrapper";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { useTranslation } from "react-i18next";
import style from "./startPage.scss"

const EditorStartPage:React.FC = ()=>{
    
    const newProjectMenu:menuContentsArray = [
        {content:"editor.projects.newChart",to:"./new/chart"},
        {content:"editor.projects.convertChart",to:"./chartconverter"},
        {content:"editor.projects.newBehavior",to:"./new/behavior"}
    ]

    React.useEffect(()=>{
        document.title = `Editor - Feature Me`;
    },[])

    return(
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
                                newProjectMenu.map((menu,index)=>{
                                    return(
                                        <LinkWrapper to={menu.to} key={index}>
                                            <div className={style.newprojectCard}>
                                                <h2><TranslateText content={menu.content} /></h2>
                                            </div>
                                        </LinkWrapper>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={style.allproject}>
                        <h2><TranslateText content="editor.projects.open" /></h2>
                        <div className={style.contentWrapper}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditorStartPage