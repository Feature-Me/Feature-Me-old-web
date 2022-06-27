import * as React from 'react';
import gameData from 'dataController/gameData/gameData';

import style from "./menu.scss"
import Head from 'global/head/head';

const PlayMenu: React.FC<{backFunc?:Function}> = (props) => {
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
                <div className={style.left}>
                    Play Solo
                </div>
                <div className={style.right}>
                    Play MultiPlayer
                </div>
                <div className={style.left}>
                    Story
                </div>
                <div className={style.right}>
                    Collections
                </div>
                <div className={style.left}>
                    Settings
                </div>
                <div className={style.right}>
                    About
                </div>
                <div className={style.left} onClick={showBackground}>
                    View Background
                </div>
            </div>
        </div>
    )
}


export default PlayMenu;