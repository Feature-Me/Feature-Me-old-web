import React from "react";
import style from './title.scss';
import { VscClose } from 'react-icons/vsc';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SelectBox from "../global/selectbox/selectbox";
import deleteCache from "global/cacheController/deleteCache";
import Window from "../global/window/window";

const selectLanguageOptions = [
    { value: "en_us", label: "English(EN-US)" },
    { value: "en_uk", label: "English(EN-UK)" },
    { value: "ja", label: "日本語(JA-JP)" },
    { value: "zh_cn", label: "简体中文(ZH-CN)" },
];




const SettingsWindow: React.FC<{ showSettingsWindow: boolean, setShowSettingsWindow: React.Dispatch<React.SetStateAction<boolean>>,showTermsWindow:boolean,setShowTermsWindow:React.Dispatch<React.SetStateAction<boolean>> }> = (props): JSX.Element => {
    const [translation, i18n] = useTranslation();
    const animationController = useAnimation();

    function closeSettingsWindow(): void {
        setTimeout(() => {
            props.setShowSettingsWindow(false);
        }, 500);
    }

    React.useEffect(() => {
        const environment = JSON.parse(localStorage.getItem("environment")!);
        environment.language = i18n.language;
        localStorage.setItem("environment", JSON.stringify(environment));
    }, [i18n.language]);

    return (
        <Window  title={translation("title.settingsWindow.title")} className={style.settings_window} showWindow={props.showSettingsWindow} setShowWindow={props.setShowSettingsWindow}>
            <div>
                <div className={style.content}>
                    <h3>{translation("title.settingsWindow.selectLanguage")}</h3>
                    <SelectBox contents={selectLanguageOptions} onChange={(value: { value: string, label: string }) => { console.log(`Language is Changed to ${value.label}`); i18n.changeLanguage(value.value) }} value={selectLanguageOptions.find(e => e.value == i18n.language)!} />
                </div>
                <div className={style.content}>
                    <h3>{translation("title.settingsWindow.storageCache.config")}</h3>
                    <button className={style.redbtn}>{translation("title.settingsWindow.delete")}</button>
                </div>
                <div className={style.content}>
                    <h3>{translation("title.settingsWindow.storageCache.account")}</h3>
                    <button className={style.redbtn}>{translation("title.settingsWindow.delete")}</button>
                </div>

                <div className={style.content}>
                    <h3>{translation("title.settingsWindow.storageCache.resources")}</h3>
                    <button className={style.redbtn} onClick={e => deleteCache.resources()}>{translation("title.settingsWindow.delete")}</button>
                </div>
                <div className={style.content}>
                    <h3>{translation("title.settingsWindow.storageCache.environment")}</h3>
                    <button className={style.redbtn} onClick={e => deleteCache.enviroment()}>{translation("title.settingsWindow.delete")}</button>
                </div>
                <div className={style.content}>
                    <h3>{translation("title.settingsWindow.storageCache.all")}</h3>
                    <button className={style.redbtn} >{translation("title.settingsWindow.delete")}</button>
                </div>
                <div className={style.content}>
                    <h3>{translation("title.terms")}</h3>
                    <button onClick={() => { props.setShowTermsWindow(true) }}>{translation("title.read")}</button>
                </div>
            </div>
        </Window>
    )
}


export default SettingsWindow;