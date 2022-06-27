import * as React from 'react';
import {createRoot} from 'react-dom/client';
import "../global/i18n/i18n";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import DisplayDirectionCaution from 'global/cautions/directionCaution/directionCaution';

import Title from '../title/title/title';
import style from './style.scss';
import initLocalStorage from '../dataController/cacheController/initLocalStorage';
import initIndexedDB from '../dataController/database/initIndexedDB';
import Background from 'background/background';
import gameData from 'dataController/gameData/gameData';
import PlayMenu from 'playmenu/playMenu/playMenu';
import SceneChanger from 'global/sceneChanger/sceneChangeCover';


const App: React.FC = () => {
    const [translation, i18n] = useTranslation();
    const [titleBackgroundOpened, setTitleBackgroundOpened] = React.useState(false);
    const [sceneChangerOpened, setSceneChangerOpened] = React.useState(true);
    const backgroundContainerRef = React.useRef<HTMLDivElement>();
    const pageContainerRef = React.useRef<HTMLDivElement>();
    gameData.background.renderer.container = backgroundContainerRef;
    gameData.page.container = pageContainerRef;
    gameData.sceneChangerOpened = {
        value: sceneChangerOpened,
        setter: setSceneChangerOpened
    }
    gameData.titleBackgroundOpened = {
        value:titleBackgroundOpened,
        setter:setTitleBackgroundOpened
    }

    React.useEffect(() => {
        gameData.page.allPages["play"] = PlayMenu;
    }, []);


    return(
        <div className={style.app} >
            <div ref={backgroundContainerRef}></div>
            <div ref={pageContainerRef} className={style.pagecontainer}></div>
            <Title titleBackgroundOpened={titleBackgroundOpened} setTitleBackgroundOpened={setTitleBackgroundOpened}/>
            <DisplayDirectionCaution  />
            <ToastContainer position='bottom-right' autoClose={3000} hideProgressBar closeOnClick draggable transition={Slide} theme="dark" />
            <SceneChanger />
        </div>
    )
}


function render():void{
    const container:HTMLDivElement = document.querySelector("#root")!;
    createRoot(container).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

function init():void{
    initLocalStorage();
    if(!JSON.parse(localStorage.getItem("DBVersion")!).initialized) initIndexedDB();
    render();
    console.log("%c Feature Me is started Rendering. the Game is Ready!","font-family: 'Julius Sans One'; font-size: 30px; color: whitesmoke");
    console.log("%c Hold up!","color:red;font-size:64px");
    console.log("%c Do you know what you are supposed to do with this tool? If you do, how about contributing to this project?","color:#1189da;font-size:24px;");
    window.addEventListener("error",e=>{
        console.log(e);
    })
}



window.addEventListener('load', init);
window.addEventListener("contextmenu",(e)=>e.preventDefault());