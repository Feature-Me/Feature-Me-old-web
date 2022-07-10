import React from "react";
import style from "./musicListContent.scss";
import gameData from "dataController/gameData/gameData";
import arrayBufferToBase64 from "functions/arrayBufferToBase64/arrayBufferToBase64";

const MusicListContent:React.FC<{title:string}> = (props) => {
    console.log(props.title);
    
    const data = gameData.musicData.content.find(data => data.metadata.title == props.title);
    const background = "data:image/png;base64," + arrayBufferToBase64(data.metadata.thumbnail);
    return(
        <div className={style.musiclistcontent}>
            <img src={background} alt="" />
            <div className={style.text}>
                <h3>{props.title}</h3>
            </div>
        </div>

    )
}

export default MusicListContent;