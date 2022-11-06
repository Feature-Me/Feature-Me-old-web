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
    const [ready,setReady] = React.useState(false);
    const gameDataRef = React.useRef(gameLoader.data);

    function navigateBack(e: Event) {
        e.preventDefault();

        navigate(-2);
    }
    React.useEffect(() => {
        document.title = `Play solo - Feature Me`;
        window.addEventListener("popstate", navigateBack);
        gameLoader.load();
        gameLoader.event.once("loadData",(data:gameProps)=>{
            gameDataRef.current = gameLoader.data;
            setReady(true);
        })
        return () => {
            window.removeEventListener("popstate", navigateBack);
        }
    }, [])


    return (
        <div className={style.container}>
            <MusicGame3D data={gameDataRef.current} ready={ready} />
            <MusicGameUI />
        </div>
    )
}

export default SoloMusicGame