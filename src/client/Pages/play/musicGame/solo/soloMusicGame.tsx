import MusicGame3D from "Features/play/musicGameEngine/3d/musicGame3d";
import MusicGameUI from "Features/play/musicGameEngine/UI/musicGameUI";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import React from "react";

const SoloMusicGame: React.FC = () => {
    const navigate = useSeneChangeNavigation();

    function navigateBack(e:Event){
        e.preventDefault();
        
        navigate(-2);
    }
    React.useEffect(()=>{
        document.title = `Play solo - Feature Me`;
        window.addEventListener("popstate",navigateBack);
        return ()=> window.removeEventListener("popstate",navigateBack)
    },[])
    return (
        <div>
            <MusicGame3D />
            <MusicGameUI />
        </div>
    )
}

export default SoloMusicGame