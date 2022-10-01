import Header from "Block/head/head";
import TranslateText from "Components/TranslateText/TranslateText";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import SettingsRouter from "Routs/settingsRouter/settingsRouter";
import gameConfigState from "State/gameConfig/gameConfig";

import style from "./settingsPage.scss";

const SettingsPage: React.FC = (props) => {
    const sceneChangeNavigation = useSeneChangeNavigation();
    const [gameConfig, setGameConfig] = useRecoilState(gameConfigState);
    const [translate, i18n] = useTranslation();

    React.useEffect(() => {
        const config = JSON.stringify(gameConfig);
        localStorage.setItem("gameConfig", config);
    }, [gameConfig]);

    React.useEffect(() => {
        document.title = `Settings - Feature Me`;
    }, []);

    return (
        <div className={style.settingspage}>
            <Header title="Settings" backFunc={() => sceneChangeNavigation("../menu")} />
            <div className={style.settings}>
                <div className={style.sidebar}>
                    <Link className={style.sidebar_content} to={"./"}><TranslateText content="settingsPage.general.title" /></Link>
                    <Link className={style.sidebar_content} to={"./gameplay"}><TranslateText content="settingsPage.gameplay.title" /></Link>
                    <Link className={style.sidebar_content} to={"./graphics"}><TranslateText content="settingsPage.graphics.title" /></Link>
                    <Link className={style.sidebar_content} to={"./audio"}><TranslateText content="settingsPage.audio.title" /></Link>
                    <Link className={style.sidebar_content} to={"./storage"}><TranslateText content="settingsPage.storage.title" /></Link>
                </div>
                <div className={style.content}>
                    <SettingsRouter />
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;