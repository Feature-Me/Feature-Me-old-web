import MusicGame3D from "Features/play/musicGameEngine/3d/musicGame3d";
import useGameLoader from "Features/play/musicGameEngine/initializer/init";
import MusicGameUI from "Features/play/musicGameEngine/UI/musicGameUI";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import React from "react";
import { gameProps } from "Types/play/game/gameProps";
import style from "./soloMusicGame.scss"

const SoloMusicGame: React.FC = () => {
    const navigate = useSeneChangeNavigation();
    const gameLoader = useGameLoader();

    function navigateBack(e: Event) {
        e.preventDefault();

        navigate(-2);
    }
    React.useEffect(() => {
        document.title = `Play solo - Feature Me`;
        window.addEventListener("popstate", navigateBack);
        gameLoader.load()
        return () => {
            window.removeEventListener("popstate", navigateBack);
        }
    }, [])


    return (
        <div className={style.container}>
            <MusicGame3D {...gameLoader.data} />
            <MusicGameUI />
        </div>
    )
}

export default SoloMusicGame