import React from "react";
import musicSelectVar from "musicSelect/musicSelectVariables";
import {useRecoilValue} from "recoil";
import { Howl,Howler } from "howler";
import { motion,transform,useAnimation } from "framer-motion";
import { MusicAssetContents } from "dataController/resourcesUpdater/installMusic";

import style from "./musicDetails.scss";
import arrayBufferToBase64 from "functions/arrayBufferToBase64/arrayBufferToBase64";

const MusicDetails:React.FC = () => {
    const animationController = useAnimation();
    const musicSelectVariables = useRecoilValue(musicSelectVar);
    const imageRef = React.useRef<HTMLDivElement>();
    let data = musicSelectVariables.selectedContentData;
    let sound: Howl;

    const imageAnimation = {
        opacity: 1,
        "--rotateZ": "0deg",
        transition: {
            duration: 0.7,
            ease: "easeOut",
        }

    }

    React.useEffect(()=>{
        if(!data) return;
        animationController.start(imageAnimation);
        imageRef.current.style.backgroundImage = `url(data:${data.metadata.thumbnail.mime};base64,${arrayBufferToBase64(data.metadata.thumbnail.data)})`;
        const audio = data.music.find(audio => audio.name == data.metadata.selectedMusic);
        const audioUri = `data:${audio.mime};base64,${arrayBufferToBase64(audio.data)}`;
        let fadeOutCount: NodeJS.Timeout;
        sound = new Howl({
            src: [audioUri],
            loop: true,
            volume: 0.8,
            sprite: {
                music: [data.metadata.demo.start-3000,data.metadata.demo.end+3000]
            }
        });
        function playMusic() {
            if(fadeOutCount) clearTimeout(fadeOutCount);
            sound.play("music");
            sound.fade(0, 0.8, 3000);
            fadeOutCount = setTimeout(()=>{
                sound.fade(0.8, 0, 3000);
                setTimeout(() => {
                    sound.stop();
                    playMusic();
                }, 3500);
            },data.metadata.demo.end-data.metadata.demo.start+3000);
        }
        playMusic();

        return ()=>{
            sound.unload();
            if(fadeOutCount)clearTimeout(fadeOutCount);
        }

    },[data]);
    if(!data) return null;

    return (
        <div className={style.container}>
            <h1>{data.metadata.title}</h1>
            <h2>{data.metadata.composer}</h2>
            <p>BPM:{data.metadata.bpm.display} , Time:{data.metadata.time.display} , <span className={style.license}>{data.metadata.license}</span></p>
            <motion.div className={style.image} ref={imageRef} animate={animationController} initial={{"--rotateZ":"-10deg"} as any} style={{transform:"rotateZ(var(--rotateZ))"}}>
                {/* <img src={"data:image/png;base64," + arrayBufferToBase64(data.metadata.thumbnail)} alt="" height={512} width={512}/> */}
            </motion.div>
            <div className={style.selections}>
                <div className={style.diffSelector}>
                    <button>Select Music</button>
                </div>
            </div>
        </div>
    )
}

export default MusicDetails;