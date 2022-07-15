import React, { FormEventHandler } from "react";
import musicSelectVar from "musicSelect/musicSelectVariables";
import {useRecoilState, useRecoilValue} from "recoil";
import { Howl,Howler } from "howler";
import { motion,transform,useAnimation } from "framer-motion";
import { MusicAssetContents } from "dataController/resourcesUpdater/installMusic";
import Window from "global/window/window";

import style from "./musicDetails.scss";
import arrayBufferToBase64 from "functions/arrayBufferToBase64/arrayBufferToBase64";
import databaseInfo from "global/databaseInfo.json";

const MusicDetails:React.FC = () => {
    const animationController = useAnimation();
    const [musicSelectVariables, setMusicSelectVariables] = useRecoilState(musicSelectVar);
    const imageRef = React.useRef<HTMLDivElement>();
    const [showWindow,setShowWindow] = React.useState(false);
    let difficulties:{[key:string]:number} = {};
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
        console.log(data);
        
        for (const diff of musicSelectVariables.selectedContentData.metadata.difficulties) {
            difficulties[diff.name] = diff.level;
        }

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

    function setMusic (name:string){
        
        setMusicSelectVariables({
            ...musicSelectVariables,
            selectedContentData: {
                ...musicSelectVariables.selectedContentData,
                metadata: {
                    ...musicSelectVariables.selectedContentData.metadata,
                    selectedMusic: name
                }
            }
        });

    }
    if(!data) return null;

    return (
            <div className={style.container}>
                <div className={style.details}>
                <h1>{data.metadata.title}</h1>
                <h2>{data.metadata.composer}</h2>
                <p>BPM:{data.metadata.bpm.display} , Time:{data.metadata.time.display} , <span className={style.license}>{data.metadata.license}</span></p>
                <motion.div className={style.image} ref={imageRef} animate={animationController} initial={{ "--rotateZ": "-10deg" } as any} style={{ transform: "rotateZ(var(--rotateZ))" }}>
                    {/* <img src={"data:image/png;base64," + arrayBufferToBase64(data.metadata.thumbnail)} alt="" height={512} width={512}/> */}
                </motion.div>
                <div className={style.selections}>
                    <div className={style.diffSelector}>
                        <button onClick={()=>{setShowWindow(!showWindow)}}>Change Music</button>
                        <button>Memory {(difficulties&&difficulties.memory) || "-"}</button>
                        <button>Advance {(difficulties&&difficulties.advance) || "-"}</button>
                        <button>Prospects {(difficulties&&difficulties.prospects) || "-"}</button>
                        <button>Ozma {(difficulties&&difficulties.ozma) || "-"}</button>
                    </div>
                </div>
                </div>
            <Window title="Select Music" showWindow={showWindow} setShowWindow={setShowWindow}>
                <form onSubmit={() => false} >
                    {data.music.map((audio, index) => {
                        const flag = data.metadata.selectedMusic == audio.name;
                        console.log(flag);
                        
                        return (
                            <div key={index}>
                                <label>
                                    <input type="radio" name="music" value={audio.name} onChange={()=>{setMusic(audio.name)}} defaultChecked={flag} />
                                    {audio.name}
                                </label>
                            </div>)
                    }
                    )}
                </form>
            </Window>
            </div>
    )
}

export default MusicDetails;