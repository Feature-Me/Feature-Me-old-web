import Header from "Block/head/head";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

import style from "./serverExplorer.scss"

const ServerExplorer: React.FC = () => {
    return (
        <div className={style.serverExplorer}>
            <Header title="Multiplayer" />
            <div className={style.contents}>
                <h1><TranslateText content="multiPlay.serverExplorer.title" /></h1>
                <div className={style.newServerBtn}>
                    <div className={style.button}>
                        <div className={style.iconWrapper}>
                            <MdAddCircleOutline />
                        </div>
                        <TranslateText content="multiPlay.serverExplorer.newRoom" />
                    </div>
                    <a href="" target="_blank" ><TranslateText content="multiPlay.serverExplorer.customServer" /></a>
                </div>
            </div>
        </div>
    )
}

export default ServerExplorer