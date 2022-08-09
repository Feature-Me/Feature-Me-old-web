import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import musicGameState from "State/musicGame/musicGameState";
import musicSelectorState from "State/musicSelector/musicSelectorState";

const SoloRelay: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const setMusicgame = useSetRecoilState(musicGameState);
    const musicSelect = useRecoilValue(musicSelectorState);

    React.useEffect(() => {

        setMusicgame((game: MusicGameStateType) => {
            return {
                ...game,
                mode: "solo",
                difficulty: params["diff"] as MusicGameStateType["difficulty"],
            }
        })

        navigate("../game");
    }, []);

    return (
        <div>
        </div>
    )
}

export default SoloRelay;