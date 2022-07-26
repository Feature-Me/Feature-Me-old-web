import React, { FormEventHandler } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Howl, Howler } from "howler";
import { motion, transform, useAnimation } from "framer-motion";
import { MusicAssetContents } from "../../../Utils/resources/musicResources/installMusic";

import style from "./musicDetails.scss";

import Window from "Components/Window/window";
import RhombusButton from "Components/Button/chamferedButton/chamferedButton";

import arrayBufferToBase64 from "Utils/ArrayBuffertoBase64/ArrayBuffertoBase64";
import databaseInfo from "../../../Config/databaseInfo.json";
import musicSelectorState from "State/musicSelector/musicSelectorState";
import { useLocation, useNavigate } from "react-router";

const MusicDetails: React.FC = () => {
    const urlParams = useLocation();
    const navigate = useNavigate();
    const animationController = useAnimation();
    const [musicSelector, setMusicSelector] = useRecoilState(musicSelectorState);
    const imageRef = React.useRef<HTMLDivElement>(null);
    const selectionsRef = React.useRef<HTMLDivElement>(null);
    const [showWindow, setShowWindow] = React.useState(false);
    let difficulties: { [key: string]: number } = {};
    let data = musicSelector.selectedData as MusicAssetContents;
    let sound: Howl;

    

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

        animationController.start(imageAnimation);
        imageRef.current.style.backgroundImage = `url(data:${data.metadata.thumbnail.mime || "image/png"};base64,${arrayBufferToBase64(data.metadata.thumbnail.data)})`;
        console.log(data.metadata.selectedMusic);

        if (location.pathname.includes("solo")) selectionsRef.current!.querySelector<HTMLDivElement>(`.${style.multi}`)!.style.display = "none";
        else selectionsRef.current!.querySelector<HTMLDivElement>(`.${style.solo}`)!.style.display = "none";
        

        const audio = data.music.find(audio => audio.name == data.metadata.selectedMusic) || data.music[0];
        const audioUri = `data:${audio.mime || "audio/mp3"};base64,${arrayBufferToBase64(audio.data)}`;
        let fadeOutCount: NodeJS.Timeout;
        sound = new Howl({
            src: [audioUri],
            loop: true,
            volume: 0.8,
            sprite: {
                music: [data.metadata.demo.start - 3000, data.metadata.demo.end + 3000]
            }
        });

        function playMusic() {
            if (fadeOutCount) clearTimeout(fadeOutCount);
            sound.play("music");
            sound.fade(0, 0.8, 3000);
            fadeOutCount = setTimeout(() => {
                sound.fade(0.8, 0, 3000);
                setTimeout(() => {
                    sound.stop();
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
            sound.unload();
            if (fadeOutCount) clearTimeout(fadeOutCount);
        }

    }, [data]);

    function setMusic(name: string) {
        console.log(name);

        setMusicSelector(music => {
            return { ...music, selectedData: { ...data, metadata: { ...data.metadata, selectedMusic: name } } }
        });
        console.log(data);

    }

    if (data?.metadata?.title != musicSelector.selectedName) return <></>;



    return (
        <div className={style.container}>
            <div className={style.details}>
                <h1>{data.metadata.title}</h1>
                <h2>{data.metadata.composer}</h2>
                <p>BPM:{data.metadata.bpm.display} , Time:{data.metadata.time.display} , <span className={style.license}>{data.metadata.license}</span></p>
                <motion.div className={style.image} ref={imageRef} animate={animationController} initial={{ "--rotateZ": "-10deg" } as any} style={{ transform: "rotateZ(var(--rotateZ))" }}>
                    {/* <img src={"data:image/png;base64," + arrayBufferToBase64(data.metadata.thumbnail)} alt="" height={512} width={512}/> */}
                </motion.div>
                <div className={style.selections} ref={selectionsRef}>
                    <div className={style.solo}>
                        <RhombusButton onClick={() => { setShowWindow(!showWindow) }}>Change Music</ RhombusButton>
                        <RhombusButton onClick={()=> { navigate("./")}} className={`${style.diffbtn} ${style.memory} ${!(difficulties?.memory) ? style.disabled : ""}`}>Memory {(difficulties?.memory) || "-"}</RhombusButton>
                        <RhombusButton className={`${style.diffbtn} ${style.advance} ${!(difficulties?.advance) ? style.disabled : ""}`}>Advance {(difficulties?.advance) || "-"}</RhombusButton>
                        <RhombusButton className={`${style.diffbtn} ${style.prospects} ${!(difficulties?.prospects) ? style.disabled : ""}`}>Prospects {(difficulties?.prospects) || "-"}</RhombusButton>
                        <RhombusButton className={`${style.diffbtn} ${style.ozma} ${!(difficulties?.ozma) ? style.disabled : ""}`}>Ozma {(difficulties?.ozma) || "-"}</RhombusButton>
                    </div>
                    <div className={style.multi} >
                        <RhombusButton>Select</RhombusButton>
                    </div>
                </div>
            </div>
            <Window title="Select Music" showed={showWindow} setShowed={setShowWindow} >
                <form onSubmit={e => e.preventDefault()} >
                    {data.music.map((audio, index) => {
                        const flag = data.metadata.selectedMusic == audio.name;
                        return (
                            <div key={index}>
                                <label>
                                    <input type="radio" name="music" value={audio.name} onChange={() => { setMusic(audio.name) }} defaultChecked={flag} />
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