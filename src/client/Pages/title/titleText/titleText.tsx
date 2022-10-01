import * as React from "react";
import style from './titleText.scss';
import { FiSettings } from "react-icons/fi";
import { useTranslation } from 'react-i18next';
import { createRoot } from "react-dom/client";
import { motion, useAnimation } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import version from "../../../Config/versions.json";

import { settingsWindowAtomState } from "../../../State/window/windowState";
import sceneChangerState from "State/sceneChanger/sceneChangerstate";
import fetchResourcesUpdate from "../../../Utils/fetchUpdate/fetchResourcesUpdate";
import backgroundState from "State/background/backgroundState";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import TranslateText from "Components/TranslateText/TranslateText";



const TitleText: React.FC = () => {
    const [translation, i18n] = useTranslation();
    const titleTextRef = React.useRef<HTMLDivElement>(null);
    const modeSelectorRef = React.useRef<HTMLDivElement>(null);
    const loadingTextRef = React.useRef<HTMLDivElement>(null);
    const [showSettingsWindow, setShowSettingsWindow] = useRecoilState(settingsWindowAtomState);
    //const [sceneChanger, setSceneChanger] = useRecoilState(sceneChangerState);
    const sceneChangeNavigation = useSeneChangeNavigation();
    const setBackgroundState = useSetRecoilState(backgroundState);
    const navigate = useNavigate();

    const animationController = useAnimation();

    const titleTextAnimationOpen = {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        }
    }

    const titleTextAnimationClose = {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        }
    }

    /*     React.useEffect(() => {
            if (gameData.titleBackgroundOpened.value) {
                animationController.start(titleTextAnimationOpen);
            }
            else {
                setTitleTextSelectMode(false);
                animationController.start(titleTextAnimationClose);
            }
    
        }, [gameData.titleBackgroundOpened.value])
         */
    function setTitleTextSelectMode(state: boolean): void {
        if(!modeSelectorRef.current||!loadingTextRef.current) return;
        if (state) {
            modeSelectorRef.current.style.display = "none";
            loadingTextRef.current.style.display = "block";
        } else {
            modeSelectorRef.current.style.display = "block";
            loadingTextRef.current.style.display = "none";
        }

    }

    React.useEffect(() => {
        setTitleTextSelectMode(false);
    }, [])

    async function handleClick(link:string): Promise<void> {
        setTitleTextSelectMode(true);
        await fetchResourcesUpdate();
        //setSceneChanger(sceneChanger=>sceneChanger+1);
        sceneChangeNavigation(link);
        setTimeout(() => {
            setBackgroundState(backgroundState => { return { ...backgroundState, showed: true } });
        }, 500);
    }

    return (
        <motion.div className={style.titletext} ref={titleTextRef} animate={animationController}>
            <div className={style.title}>
                <h1>Feature Me</h1>
            </div>
            <div className={style.selectmode}>
                <div ref={modeSelectorRef}>
                    <p onClick={() => { handleClick("play/menu")}} data-link={"play/menu"}>Play</p>
                    <p onClick={() => { handleClick("editor") }} data-link={"editor"}>Editor</p>
                    <p onClick={() => { handleClick("leaderboards") }} data-link={"leaderboards"}>Leaderboards</p>
                    <p onClick={() => { handleClick("musicroom") }} data-link={"musicroom"}>Music Room</p>
                </div>
                <div ref={loadingTextRef}>
                    <p>Loading...</p>
                </div>
            </div>
            <div className={style.footer}>
                <p>Feature Me {version.version} - {version.build} <br /> Mksk and Rae The Feature Me Project  ©{new Date().getFullYear()} Feature Me All rights reserved.
                </p>
                <div className={style.setlang}>
                    <TranslateText content="title.language" />
                </div>
                <div className={style.settings} onClick={() => { setShowSettingsWindow(!showSettingsWindow) }}>
                    <FiSettings className={style.settings_icon} />
                </div>
            </div>
        </motion.div>
    )
}

export default TitleText;