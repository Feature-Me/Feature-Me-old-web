import * as React from 'react';
import {createRoot} from 'react-dom/client';
import jszip from 'jszip';
import "../global/i18n/i18n";
import i18next from 'i18next';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Title from '../title/title';
import style from './style.scss';
import { getI18n, I18nextProvider, useTranslation } from 'react-i18next';
import initLocalStorage from '../global/cacheController/initLocalStorage';
import initIndexedDB from '../global/database/initIndexedDB';



function App(): JSX.Element {
    const [translation, i18n] = useTranslation();

    return(
        <div className={style.app}>
            <Title />
            <ToastContainer position='bottom-right' autoClose={3000} hideProgressBar closeOnClick draggable transition={Slide} theme="dark" />
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
    console.log("Feature Me initialized. the Game is Ready!");
    console.log("%c Hold up!","color:red;font-size:64px;border:4px solid black;");
    console.log("%c  Do you know what you are supposed to do with this tool? If you do, how about contributing to this project?","color:#1189da;font-size:24px;");
    
    
}



window.addEventListener('load', init);
window.addEventListener("contextmenu",(e)=>e.preventDefault());