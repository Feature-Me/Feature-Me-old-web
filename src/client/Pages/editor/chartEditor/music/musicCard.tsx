import React from "react";

import style from "./music.scss";

const MusicCard:React.FC<{music:chartEditorMusic,index:number}> = (props) => {
    return(
        <div className={style.musicListContent}>
            <h2>{props.music.name}</h2>
        </div>
    )
}
export default MusicCard;