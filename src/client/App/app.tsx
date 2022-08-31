import * as React from 'react';
import {createRoot} from 'react-dom/client';
import { useTranslation } from 'react-i18next';
import { RecoilRoot, useRecoilValue } from "recoil";
import { BrowserRouter , Route } from 'react-router-dom';
import { ToastContainer,Slide } from 'react-toastify';
import { Howl, Howler } from 'howler';
import "i18n/i18n";

import initDatabase from 'Utils/database/initDatabase';
import initLocalStorage from 'Utils/LocalStorage/initLocalStorage';

import DisplayDirectionCaution from 'Block/displayDirectionCaution/displayDirectionCaution';
import PageRouter from 'Routs/router';
import SceneChangeCover from 'Block/sceneChangeCover/sceneChangeCover';
import Background from 'Block/background/background';

import 'react-toastify/dist/ReactToastify.css';
import style from './app.scss';

import clicksound from 'Assets/Sounds/click.mp3';

function App(): JSX.Element {
    const [translation, i18n] = useTranslation();

    React.useEffect(() => {
        const environment = JSON.parse(localStorage.getItem("environment")!);
        environment.language = i18n.language;
        localStorage.setItem("environment", JSON.stringify(environment));
    }, [i18n.language]);

    
    return(
        <BrowserRouter>
            <div className={style.app}>
                <Background />
                <PageRouter />
                {/* <ToastContainer position='bottom-right' autoClose={3000} hideProgressBar closeOnClick draggable transition={Slide} theme="dark" /> */}
                <SceneChangeCover />
                <DisplayDirectionCaution />
            </div>
        </BrowserRouter>
    )
}


function render():void{
    const container:HTMLDivElement = document.querySelector("#root")!;
    createRoot(container).render(
        <RecoilRoot>
                <App />
        </RecoilRoot>
    );
}


const clickSound = new Howl({
    src: clicksound,
    volume: 0.5,
    loop: false,
    autoplay: false,
});

function init():void{
    initLocalStorage();
    if (!JSON.parse(localStorage.getItem("DBVersion")!).initialized) initDatabase();
    render();

    console.log("Feature Me initialized. the Game is Ready!");
    console.log("%c Hold up!","color:red;font-size:64px;border:4px solid black;");
    console.log("%c  Do you know what you are supposed to do with this tool? If you do, how about contributing to this project?","color:#1189da;font-size:24px;");
}
window.addEventListener('load', init);
window.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener("popstate", (e) => { });
window.addEventListener("click", () => {
    clickSound.play();
})