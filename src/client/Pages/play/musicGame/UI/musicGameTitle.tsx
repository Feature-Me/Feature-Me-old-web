import { motion, useAnimation } from "framer-motion";
import React from "react"
import { useRecoilValue } from "recoil";

import { musicGameModeState, musicGamePauseState } from "State/play/game/musicGame/musicGameState";
import musicSelectorState from "State/play/musicSelector/musicSelectorState";
import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";

import style from "./musicGameUI.scss";

const MusicGameTitle: React.FC<{}> = (props) => {
    const musicGameMode = useRecoilValue(musicGameModeState);
    const musicGamePause = useRecoilValue(musicGamePauseState);
    const selectedMusic = useRecoilValue(musicSelectorState);

    const musicGameTitleRef = React.useRef<HTMLDivElement>(null);

    const musicData = selectedMusic.selectedData as MusicAssetContents;
    const chartMetaData = musicData.metadata.difficulties.find(diff => diff.name == musicGameMode.difficulty)

    const titleAnimationController = useAnimation();
    const titleAnimation = {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        }
    }

    async function fadeOut() {
        if (musicGameTitleRef.current) {
            titleAnimationController.start(titleAnimation);
            musicGameTitleRef.current.style.visibility = "hidden";
        }
    }

    React.useEffect(() => {
        if (!musicGamePause.ready) return;
        const titleTimeout = setTimeout(fadeOut, 3500);
        return () => {
            clearTimeout(titleTimeout);
        }

    }, [musicGamePause.ready])

    return (
        <motion.div className={style.musicgameTitle} ref={musicGameTitleRef} animate={titleAnimationController}>
            <p>{`${chartMetaData?.name} ${chartMetaData?.level}`} - {chartMetaData?.chartDesigner}</p>
            <div className={style.thumbnail} style={{ backgroundImage: `url(data:${musicData.metadata.thumbnail.mime || "image/png"};base64,${arrayBufferToBase64(musicData.metadata.thumbnail.data)})` }}></div>
            <h1>{musicData.metadata.title}</h1>
            <h2>{musicData.metadata.composer}</h2>
        </motion.div>
    )
}

export default MusicGameTitle