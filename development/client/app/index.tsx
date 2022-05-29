import * as React from 'react';
import {createRoot} from 'react-dom/client';
import Title from '../title/title';
import style from './style.scss';
import { getI18n, I18nextProvider, useTranslation } from 'react-i18next';
import initLocalStorage from '../global/cacheController/initLocalStorage';

import "../global/i18n/i18n";
import i18next from 'i18next';


function App(): JSX.Element {
    const [translation, i18n] = useTranslation();
    return(
        <div className={style.app}>
            <Title />
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
    render();
    console.log("Feature Me initialized. the Game is Ready!");
    console.log("%c Hold up!","color:red;font-size:64px;border:4px solid black;");
    console.log("%c  Do you know what you are supposed to do with this tool? If you do, how about contributing to this project?","color:#1189da;font-size:24px;");
    
    
}



window.addEventListener('load', init);
window.addEventListener("contextmenu",(e)=>e.preventDefault());