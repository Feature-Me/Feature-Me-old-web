import * as React from "react";
import style from './title.scss';
import { FiSettings } from "react-icons/fi";
import { useTranslation } from 'react-i18next';
import  version  from "../global/versions.json";
import jszip from 'jszip';

const TitleText: React.FC<{showSettingsWindow:boolean,setShowSettingsWindow:React.Dispatch<React.SetStateAction<boolean>>,showResourcesDownloadWindow:boolean,setShowDownloadsWindow:React.Dispatch<React.SetStateAction<boolean>>}> = (props) => {
    const [translation, i18n] = useTranslation();
    return (
        <div className={style.titletext}>
            <div className={style.title}>
                <h1>Feature Me</h1>
            </div>
            <div className={style.selectmode}>
                <p onClick={()=>titleTextClicked("play")}>Play</p>
                <p onClick={()=>titleTextClicked("chart editor")} >Chart Editor</p>
                <p onClick={()=>titleTextClicked("leaderboards")}>Leaderboards</p>
                <p onClick={()=>titleTextClicked("music room")} >Music Room</p>
            </div>
            <div className={style.footer}>
                <p>Feature Me {version.version} - {version.build} Mksk and Raetan The Feature Me Project  ©2022 Feature Me All rights reserved.</p>
                <div className={style.setlang}>
                    {translation("title.language")}
                </div>
                <div className={style.settings} onClick={() => props.setShowSettingsWindow(!props.showSettingsWindow)}>
                    <FiSettings className={style.settings_icon} />
                </div>
            </div>
        </div>
    )
}

function titleTextClicked(name:string): void {
    const ResourcesDownloaded = JSON.parse(localStorage.getItem("ResourcesDownloaded")!);
    if(!ResourcesDownloaded.model||!ResourcesDownloaded.music){}
}


export default TitleText;