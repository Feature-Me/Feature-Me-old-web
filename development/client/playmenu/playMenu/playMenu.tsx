import * as React from 'react';
import gameData from 'dataController/gameData/gameData';

import style from "./menu.scss"
import Head from 'global/head/head';
import switchPage from 'global/sceneChanger/swtchPage';
import { useTranslation } from 'react-i18next';

const PlayMenu: React.FC<{backFunc?:Function}> = (props) => {
    const [translation,i18n] = useTranslation();
    const backFunc = props.backFunc || function(){ gameData.titleBackgroundOpened.setter(false) }
    const playSelectRef = React.useRef<HTMLDivElement>();

    function showBackground() {
        playSelectRef.current.style.opacity = "0";
        playSelectRef.current.addEventListener("click",showUI)
    }
    function showUI() {
        playSelectRef.current.style.opacity = "1";
        playSelectRef.current.removeEventListener("click",showUI)
    }


    return (
        <div className={style.menu}>
            <Head title='Home' backFunc={backFunc}/>
            <div className={style.playselect} ref={playSelectRef}>
                <div className={style.left} onClick={()=>{switchPage("musicSelect");gameData.gameMode="solo"}}>
                    {translation("menu.solo")}
                </div>
                <div className={style.right}>
                    {translation("menu.multi")}
                </div>
                <div className={style.left}>
                    {translation("menu.story")}
                </div>
                <div className={style.right}>
                    {translation("menu.collection")}
                </div>
                <div className={style.left}>
                    {translation("menu.settings")}
                </div>
                <div className={style.right}>
                    {translation("menu.about")}
                </div>
                <div className={style.left} onClick={showBackground}>
                    {translation("menu.viewbg")}
                </div>
            </div>
        </div>
    )
}


export default PlayMenu;