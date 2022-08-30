import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as musicGame from "State/musicGame/musicGameState";
import musicSelectorState from "State/musicSelector/musicSelectorState";
import { musicGameModeType } from "Types/State/musicGameStateType";

const SoloRelay: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    //const setMusicgame = useSetRecoilState(musicGameState);
    const musicSelect = useRecoilValue(musicSelectorState);
    const setMusicGameValue = useSetRecoilState(musicGame.musicGameValueState);
    const setMusicGameNotesJudge = useSetRecoilState(musicGame.musicGameNotesJudgeState)
    const setMusicGamePrediction = useSetRecoilState(musicGame.musicGamePredictionState);
    const setMusicGameUIState = useSetRecoilState(musicGame.musicGameUIState);
    const setMusicGameMode = useSetRecoilState(musicGame.musicGameModeState);
    const setMusicGamePause = useSetRecoilState(musicGame.musicGamePauseState);
    const setMusicGameTime = useSetRecoilState(musicGame.musicGameTimeState);

    React.useEffect(() => {
        
        setMusicGameValue(musicGame.defaultMusicGameValue);
        setMusicGameNotesJudge(musicGame.defaultMusicGameNotesJudge);
        setMusicGamePrediction(musicGame.defaultMusicGamePrediction);
        setMusicGameUIState(musicGame.defaultMusicGameUIState);
        setMusicGameMode(musicGame.defaultMusicGameMode);
        setMusicGamePause(musicGame.defaultMusicGamePauseState);
        setMusicGameTime(musicGame.defaultMusicGameTime);

        /* setMusicgame(defaultMusicGameStateData);

        setMusicgame((game) => {
            return {
                ...game,
                mode: "solo",
                difficulty: params["diff"] as MusicGameStateType["difficulty"],
            }
        }) */

        setMusicGameMode(game=>{
            return{
                ...game,
                mode:"solo",
                difficulty: params["diff"] as musicGameModeType["difficulty"]
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