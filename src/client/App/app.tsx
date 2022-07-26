import * as React from 'react';
import {createRoot} from 'react-dom/client';
import style from './app.scss';
import { useTranslation } from 'react-i18next';
import { RecoilRoot } from "recoil";
import { BrowserRouter , Route } from 'react-router-dom';
import { ToastContainer,Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import "../i18n/i18n";
import DisplayDirectionCaution from '../Block/displayDirectionCaution/displayDirectionCaution';
import initLocalStorage from '../Utils/LocalStorage/initLocalStorage';
import i18next from 'i18next';
import PageRouter from '../Routs/router';
import initDatabase from '../Utils/database/initDatabase';
import SceneChangeCover from 'Block/sceneChangeCover/sceneChangeCover';
import Background from 'Block/Background/background';

function App(): JSX.Element {
    
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

function init():void{
    initLocalStorage();
    if (!JSON.parse(localStorage.getItem("DBVersion")!).initialized) initDatabase();
    render();

    console.log("Feature Me initialized. the Game is Ready!");
    console.log("%c Hold up!","color:red;font-size:64px;border:4px solid black;");
    console.log("%c  Do you know what you are supposed to do with this tool? If you do, how about contributing to this project?","color:#1189da;font-size:24px;");
}



window.addEventListener('load', init);
window.addEventListener("contextmenu",(e)=>e.preventDefault());
window.addEventListener("popstate",()=>{
});