import Header from "Block/head/head";
import React from "react";

import style from "./serverExplorer.scss"

const ServerExplorer: React.FC = () => {
    return (
        <div className={style.serverExplorer}>
            <Header title="Multiplayer" />
            <div className={style.contents}>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default ServerExplorer