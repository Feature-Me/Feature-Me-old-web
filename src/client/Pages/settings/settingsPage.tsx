import Head from "Block/Head/head";
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
    return (
        <div className={style.settingspage}>
            <Head title="Settings" backFunc={() => sceneChangeNavigation("../menu")} />
            <div className={style.settings}>
                <div className={style.sidebar}>
                    <Link className={style.sidebar_content} to={"./"}>{translate("settingsPage.general.title")}</Link>
                    <Link className={style.sidebar_content} to={"./gameplay"}>{translate("settingsPage.gameplay.title")}</Link>
                    <Link className={style.sidebar_content} to={"./video"}>{translate("settingsPage.video.title")}</Link>
                    <Link className={style.sidebar_content} to={"./audio"}>{translate("settingsPage.audio.title")}</Link>

                </div>
                <div className={style.content}>
                    <SettingsRouter />
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;