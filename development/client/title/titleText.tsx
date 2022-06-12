import * as React from "react";
import style from './title.scss';
import { FiSettings } from "react-icons/fi";
import { useTranslation } from 'react-i18next';
import version from "../global/versions.json";
import fetchResourcesUpdate from "../global/resourcesUpdater/fetchResourcesUpdate";
import TitleVariables from "./variables"
import { motion, useAnimation } from "framer-motion";

const TitleText: React.FC<{ showSettingsWindow: boolean, setShowSettingsWindow: React.Dispatch<React.SetStateAction<boolean>>, titleBackgroundOpened: boolean, setTitleBackgroundOpened: React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {
    const [translation, i18n] = useTranslation();
    React.useEffect(()=>{

    },[props.titleBackgroundOpened])
    return (
        <div className={style.titletext}>
            <div className={style.title}>
                <h1>Feature Me</h1>
            </div>
            <div className={style.selectmode}>
                <p onClick={() => titleTextClicked("play", props.setTitleBackgroundOpened)}>Play</p>
                <p onClick={() => titleTextClicked("chart editor", props.setTitleBackgroundOpened)} >Chart Editor</p>
                <p onClick={() => titleTextClicked("leaderboards", props.setTitleBackgroundOpened)}>Leaderboards</p>
                <p onClick={() => titleTextClicked("music room", props.setTitleBackgroundOpened)} >Music Room</p>
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

async function titleTextClicked(name: string, setTitleBackgroundOpened: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {
    if(!TitleVariables.checkedUpdated){
        TitleVariables.checkedUpdated = true;
        await fetchResourcesUpdate();
    }
    setTitleBackgroundOpened(true);
}


export default TitleText;