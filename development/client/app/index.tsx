import * as React from 'react';
import {createRoot} from 'react-dom/client';
import "../global/i18n/i18n";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

import Title from '../title/title';
import style from './style.scss';
import initLocalStorage from '../global/cacheController/initLocalStorage';
import initIndexedDB from '../global/database/initIndexedDB';



const App: React.FC = () => {
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
    console.log("%c Feature Me is started Rendering. the Game is Ready!","font-family: 'Julius Sans One'; font-size: 30px; color: whitesmoke");
    console.log("%c Hold up!","color:red;font-size:64px");
    console.log("%c Do you know what you are supposed to do with this tool? If you do, how about contributing to this project?","color:#1189da;font-size:24px;");
}



window.addEventListener('load', init);
window.addEventListener("contextmenu",(e)=>e.preventDefault());