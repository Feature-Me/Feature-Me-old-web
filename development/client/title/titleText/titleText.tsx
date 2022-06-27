import * as React from "react";
import style from './titleText.scss';
import { FiSettings } from "react-icons/fi";
import { useTranslation } from 'react-i18next';
import version from "../../global/versions.json";
import fetchResourcesUpdate from "../../dataController/resourcesUpdater/fetchResourcesUpdate";
import TitleVariables from "../variables"
import { motion, useAnimation } from "framer-motion";
import gameData from "dataController/gameData/gameData";
import loadData from "dataController/loadData/loadData";
import { createRoot } from "react-dom/client";
import Background from "background/background";
import switchPage from "global/sceneChanger/swtchPage";


const TitleText: React.FC<{ showSettingsWindow: boolean, setShowSettingsWindow: React.Dispatch<React.SetStateAction<boolean>>}> = (props) => {
    const [translation, i18n] = useTranslation();
    const titleTextRef = React.useRef<HTMLDivElement>();
    const modeSelectorRef = React.useRef<HTMLDivElement>();
    const loadingTextRef = React.useRef<HTMLDivElement>();

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

    /* React.useEffect(()=>{
        if(props.titleBackgroundOpened){
            animationController.start(titleTextAnimation);
        }
        else{
            setTitleTextSelectMode(false);
        }

    },[props.titleBackgroundOpened]) */
    React.useEffect(() => {
        if (gameData.titleBackgroundOpened.value) {
            animationController.start(titleTextAnimationOpen);
        }
        else {
            setTitleTextSelectMode(false);
            animationController.start(titleTextAnimationClose);
        }

    }, [gameData.titleBackgroundOpened.value])
    function setTitleTextSelectMode(state:boolean):void{
        if(state){
            modeSelectorRef.current.style.display = "none";
            loadingTextRef.current.style.display = "block";
        }else{
            modeSelectorRef.current.style.display = "block";
            loadingTextRef.current.style.display = "none";
        }

    }
    return (
        <motion.div className={style.titletext} ref={titleTextRef} animate={animationController}>
            <div className={style.title}>
                <h1>Feature Me</h1>
            </div>
            <div className={style.selectmode}>
                <div ref={modeSelectorRef}>
                    <p onClick={() => {setTitleTextSelectMode(true);titleTextClicked("play")}}>Play</p>
                    <p onClick={() => {setTitleTextSelectMode(true);titleTextClicked("chart editor")}} >Chart Editor</p>
                    <p onClick={() => {setTitleTextSelectMode(true);titleTextClicked("leaderboards")}}>Leaderboards</p>
                    <p onClick={() => {setTitleTextSelectMode(true);titleTextClicked("music room")}} >Music Room</p>
                </div>
                <div ref={loadingTextRef}>
                    <p>Loading...</p>
                </div>
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
        </motion.div>
    )
}

async function titleTextClicked(name: string): Promise<void> {
    const setTitleBackgroundOpened = gameData.titleBackgroundOpened.setter
    if(!TitleVariables.checkedUpdated){
        TitleVariables.checkedUpdated = true;
        await fetchResourcesUpdate();
    }
    const dbOpenRequest = indexedDB.open("ResourcesDatabase");
    dbOpenRequest.onsuccess = function (event) {
        const db = dbOpenRequest.result;
        const modelStore = db.transaction("ModelDB").objectStore("ModelDB");
        const modelRequest = modelStore.getAllKeys();
        modelRequest.onsuccess = function (event) {
            const modelKeys = modelRequest.result;
            console.log(modelKeys);
        }
    }

    await loadData();
    renderBackground();
    switchPage(name,false);
    setTimeout(()=>{
        setTitleBackgroundOpened(true)
    },500)
        
}

function renderBackground(onload?:Function):void {
    const containerRef = gameData.background.renderer.container;
    
    if(gameData.background.renderer.engine == null) createRoot(containerRef.current).render(<Background onload={onload||null}/>);
}


export default TitleText;