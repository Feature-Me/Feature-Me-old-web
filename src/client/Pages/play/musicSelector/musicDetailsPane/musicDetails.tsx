import React, { FormEventHandler } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Howl, Howler } from "howler";
import { motion, transform, useAnimation } from "framer-motion";

import style from "./musicDetails.scss";

import Window from "Components/Window/window";
import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";

import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";
import databaseInfo from "Config/databaseInfo.json";
import musicSelectorState from "State/musicSelector/musicSelectorState";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import gameConfigState from "State/gameConfig/gameConfig";

const MusicDetails: React.FC = () => {
    const scenechange = useSeneChangeNavigation();
    const animationController = useAnimation();
    const [musicSelector, setMusicSelector] = useRecoilState(musicSelectorState);
    const gameConfig = useRecoilValue(gameConfigState);
    const imageRef = React.useRef<HTMLDivElement>(null);
    const selectionsRef = React.useRef<HTMLDivElement>(null);
    const [showWindow, setShowWindow] = React.useState(false);
    let difficulties: { [key: string]: number } = {};
    let data = musicSelector.selectedData as MusicAssetContents;
    let audio: Howl;

    

    const imageAnimation = {
        opacity: 1,
        "--rotateZ": "0deg",
        transition: {
            duration: 0.7,
            ease: "easeOut",
        }

    }

    if (data?.metadata?.title == musicSelector.selectedName) {
        for (const diff of data.metadata.difficulties) {
            difficulties[diff.name] = diff.level;
        }
    }



    React.useEffect(() => {
        if (data?.metadata?.title != musicSelector.selectedName) return;
        if (!imageRef.current||!selectionsRef) return;

        let fadeOutTimeout: NodeJS.Timeout;
        let musicTimeout:NodeJS.Timeout;

        animationController.start(imageAnimation);
        imageRef.current.style.backgroundImage = `url(data:${data.metadata.thumbnail.mime || "image/png"};base64,${arrayBufferToBase64(data.metadata.thumbnail.data)})`;
        console.log(data.metadata.selectedMusic);

        if (location.pathname.includes("solo")) selectionsRef.current!.querySelector<HTMLDivElement>(`.${style.multi}`)!.style.display = "none";
        else selectionsRef.current!.querySelector<HTMLDivElement>(`.${style.solo}`)!.style.display = "none";
        

        const sound = data.music.find(audio => audio.name == data.metadata.selectedMusic) || data.music[0];
        const audioUri = `data:${sound.mime || "audio/mp3"};base64,${arrayBufferToBase64(sound.data)}`;
        audio = new Howl({
            src: [audioUri],
            loop: true,
            volume: (gameConfig.audio.masterVolume * gameConfig.audio.musicVolume) ,
            sprite: {
                music: [data.metadata.demo.start - 3000, data.metadata.demo.end + 3000]
            }
        });

        function playMusic() {
            if (fadeOutTimeout) clearTimeout(fadeOutTimeout);
            audio.play("music");
            audio.fade(0, 0.8, 3000);
            fadeOutTimeout = setTimeout(() => {
                audio.fade(0.8, 0, 3000);
                musicTimeout = setTimeout(() => {
                    audio.stop();
                    playMusic();
                }, 3500);
            }, data.metadata.demo.end - data.metadata.demo.start + 3000);
        }

        playMusic();
        navigator.mediaSession.metadata = new MediaMetadata({
            title: data.metadata.selectedMusic,
            artist: data.metadata.composer,
            album: data.metadata.title,
            artwork: [
                { src: `data:${data.metadata.thumbnail.mime || "image/png"};base64,${arrayBufferToBase64(data.metadata.thumbnail.data)}`, sizes: "512x512", type: "image/png" },
            ],
        });

        return () => {
            audio.stop();
            audio.unload();
            clearTimeout(fadeOutTimeout);
            clearTimeout(musicTimeout);
        }

    }, [data]);

    function setMusic(name: string) {
        console.log(name);

        setMusicSelector(music => {
            return { ...music, selectedData: { ...data, metadata: { ...data.metadata, selectedMusic: name } } }
        });

    }

    if (data?.metadata?.title != musicSelector.selectedName) return <></>;



    return (
        <div className={style.container}>
            <div className={style.details}>
                <h1>{data.metadata.title}</h1>
                <h2>{data.metadata.composer}</h2>
                <p>BPM:{data.metadata.bpm} , Time:{data.metadata.time.display} , <span className={style.license}>{data.metadata.license}</span></p>
                <motion.div className={style.image} ref={imageRef} animate={animationController} initial={{ "--rotateZ": "-10deg" } as any} style={{ transform: "rotateZ(var(--rotateZ))" }}>
                    {/* <img src={"data:image/png;base64," + arrayBufferToBase64(data.metadata.thumbnail)} alt="" height={512} width={512}/> */}
                </motion.div>
                <div className={style.selections} ref={selectionsRef}>
                    <div className={style.solo}>
                        <ChamferedButton onClick={() => { setShowWindow(!showWindow) }}>Change Music</ ChamferedButton>
                        <ChamferedButton onClick={()=> { scenechange("../relay/memory")}} className={`${style.diffbtn} ${style.memory} ${!(difficulties?.memory) ? style.disabled : ""}`}>Memory {(difficulties?.memory) || "-"}</ChamferedButton>
                        <ChamferedButton onClick={() => { scenechange("../relay/advance") }} className={`${style.diffbtn} ${style.advance} ${!(difficulties?.advance) ? style.disabled : ""}`}>Advance {(difficulties?.advance) || "-"}</ChamferedButton>
                        <ChamferedButton onClick={() => { scenechange("../relay/prospects") }} className={`${style.diffbtn} ${style.prospects} ${!(difficulties?.prospects) ? style.disabled : ""}`}>Prospects {(difficulties?.prospects) || "-"}</ChamferedButton>
                        <ChamferedButton onClick={() => { scenechange("../relay/ozma") }} className={`${style.diffbtn} ${style.ozma} ${!(difficulties?.ozma) ? style.disabled : ""}`}>Ozma {(difficulties?.ozma) || "-"}</ChamferedButton>
                    </div>
                    <div className={style.multi} >
                        <ChamferedButton>Select</ChamferedButton>
                    </div>
                </div>
            </div>
            <Window title="Select Music" showed={showWindow} setShowed={setShowWindow} >
                    {data.music.map((audio, index) => {
                        const flag = data.metadata.selectedMusic == audio.name;
                        return (
                            <div style={{backgroundColor:flag?"#1189da":"transparent"}} key={index} onClick={(e) => setMusic(audio.name)}>
                                    {audio.name}
                            </div>
                        )
                    }
                    )}
            </Window>
        </div>
    )
}

export default MusicDetails;