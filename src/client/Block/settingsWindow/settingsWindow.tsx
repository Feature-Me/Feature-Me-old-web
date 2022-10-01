import React from "react";
import { VscClose } from 'react-icons/vsc';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from "recoil";

import SelectBox from "Components/SelectBox/selectBox";
import Window from "Components/Window/window";
import { settingsWindowAtomState, termsWindowAtomState } from "State/window/windowState";


import style from './settingsWindow.scss';
import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";

const selectLanguageOptions = [
    { value: "en_us", label: "English(EN-US)" },
    { value: "en_uk", label: "English(EN-UK)" },
    { value: "ja", label: "日本語(JA-JP)" },
    { value: "zh_cn", label: "简体中文(ZH-CN)" },
];




const SettingsWindow: React.FC = (): JSX.Element => {
    const [translation, i18n] = useTranslation();
    const animationController = useAnimation();
    const [showSettingsWindow, setShowSettingsWindow] = useRecoilState(settingsWindowAtomState);
    const [showTermsWindow, setShowTermsWindow] = useRecoilState(termsWindowAtomState);

    function closeSettingsWindow(): void {
        setTimeout(() => {
            setShowSettingsWindow(false);
        }, 500);
    }

    return (
        <Window title={translation("title.settingsWindow.title")} className={style.settings_window} showed={showSettingsWindow} setShowed={setShowSettingsWindow}>
            <div>
                <div className={style.content}>
                    <h3>{translation("title.settingsWindow.selectLanguage")}</h3>
                    <SelectBox contents={selectLanguageOptions} onChange={(value: { value: string, label: string }) => { i18n.changeLanguage(value.value) }} value={selectLanguageOptions.find(e => e.value == i18n.language)!} />
                </div>
                <div className={style.content}>
                    <h3>{translation("title.settingsWindow.storageCache.all")}</h3>
                    <ChamferedButton accentColor="#ca1c1c">{translation("title.settingsWindow.delete")}</ChamferedButton>
                </div>
                <div className={style.content}>
                    <h3>{translation("title.terms")}</h3>
                    <ChamferedButton onClick={() => { setShowTermsWindow(true) }}>{translation("title.read")}</ChamferedButton>
                </div>
            </div>
        </Window>
    )
}


export default SettingsWindow;