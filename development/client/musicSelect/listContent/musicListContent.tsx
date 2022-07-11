import React from "react";
import { useRecoilState } from "recoil";

import style from "./musicListContent.scss";
import gameData from "dataController/gameData/gameData";
import arrayBufferToBase64 from "functions/arrayBufferToBase64/arrayBufferToBase64";
import musicSelectVar from "musicSelect/musicSelectVariables";


const MusicListContent:React.FC<{title:string}> = (props) => {
    const [musicSelectVariables, setMusicSelectVariables] = useRecoilState(musicSelectVar);
    const contentRef = React.useRef<HTMLDivElement>();
    const data = gameData.musicData.content.find(data => data.metadata.title == props.title);
    const background = `data:${data.metadata.thumbnail.mime};base64,${arrayBufferToBase64(data.metadata.thumbnail.data)}`
    const musicSelectCache = JSON.parse(localStorage.getItem("musicSelect")!);

    React.useEffect(()=>{
        if((!musicSelectCache.selected&&props.title=="Tutorial")||(musicSelectCache.selected == props.title))
            select();
    },[]);
    React.useEffect(()=>{
        contentRef.current.setAttribute("selected",(musicSelectVariables.selected??musicSelectCache.selected) == props.title ? "true" : "false");
        if(musicSelectVariables.selected) {
            musicSelectCache.selected = musicSelectVariables.selected;
            localStorage.setItem("musicSelect",JSON.stringify(musicSelectCache))
        }
    },[musicSelectVariables.selected]);
    function select(){
        const data = gameData.musicData.content.find(data => data.metadata.title == props.title);
        setMusicSelectVariables({...musicSelectVariables,selected:props.title,selectedContentData:data});
    }

    return(
        <div className={style.musiclistcontent} ref={contentRef} onClick={select}>
            <img src={background} alt="" />
            <div className={style.text}>
                <h3>{props.title}</h3>
            </div>
        </div>

    )
}

export default MusicListContent;