import React from "react";
import musicSelectVar from "musicSelect/musicSelectVariables";
import {useRecoilValue} from "recoil";

import { MusicAssetContents } from "dataController/resourcesUpdater/installMusic";

import style from "./musicDetails.scss";
import arrayBufferToBase64 from "functions/arrayBufferToBase64/arrayBufferToBase64";

const MusicDetails:React.FC = () => {
    const musicSelectVariables = useRecoilValue(musicSelectVar);
    const imageRef = React.useRef<HTMLDivElement>();
    let data = musicSelectVariables.selectedContentData;
    React.useEffect(()=>{
        if(data)
            imageRef.current.style.backgroundImage = `url(data:image/png;base64,${arrayBufferToBase64(data.metadata.thumbnail)})`;
    },[data]);
    if(!data) return null;

    return (
        <div className={style.container}>
            <h1>{data.metadata.title}</h1>
            <h2>{data.metadata.composer}</h2>
            <p>BPM:{data.metadata.bpm.display} , Time:{data.metadata.time.display}</p>
            <div className={style.image} ref={imageRef}>
                {/* <img src={"data:image/png;base64," + arrayBufferToBase64(data.metadata.thumbnail)} alt="" height={512} width={512}/> */}
            </div>
            <div className={style.selections}>
                <div className={style.diffSelector}>

                </div>
            </div>
        </div>
    )
}

export default MusicDetails;