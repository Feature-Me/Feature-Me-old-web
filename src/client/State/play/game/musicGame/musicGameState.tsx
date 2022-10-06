import { atom } from "recoil"

import * as musicGameType from "Types/State/musicGameStateType";
import * as THREE from "three";
import { chartType } from "Features/parseChart/chartSample";


const defaultMusicGameValue: musicGameType.musicGameValueType = {
    score:0,
    chain:0,
    maxChain:0,
    bpm:0,
}

const defaultMusicGameNotesJudge: musicGameType.musicGameNotesJudgeType = {
    notesCount:{
        all:0,
        current:0
    },
    accuracy:0,
    judge:{
        stunning:0,
        glossy:0,
        moderate:0,
        lost:0
    },
    timing:{
        future:0,
        past:0
    }
}

const defaultMusicGamePrediction: musicGameType.musicGamePredictionType = {
    rating:0,
    score:0
}

const defaultMusicGameUIState: musicGameType.musicgameUIStateType = {
    visibility:false
}

const defaultMusicGameMode: musicGameType.musicGameModeType = {
    difficulty: "memory",
    mode:"solo",
    level:0,
    constant:0,
}
const defaultMusicGamePauseState: musicGameType.musicGamePauseState = {
    ready: false,
    paused: true
}

const defaultMusicGameTime: musicGameType.musicGameTimeType = {
    pausedDuration: 0,
    totalTime:0,
    startedTime:0
}

const defaultChart: chartType = {
    metadata: {
        scorePerNote: 0,
        initialBpm: 120,
        chain: 0,
        offset: 0
    },
    notes: [],
    effects: []
}


const musicGameValueState = atom<musicGameType.musicGameValueType>({
    key:"musicGameValueState",
    default: defaultMusicGameValue
});

const musicGameNotesJudgeState = atom<musicGameType.musicGameNotesJudgeType>({
    key:"musicGameNotesJudgeState",
    default:defaultMusicGameNotesJudge
});

const musicGamePredictionState = atom<musicGameType.musicGamePredictionType>({
    key:"musicGamePredictionState",
    default:defaultMusicGamePrediction
});

const musicGameUIState = atom<musicGameType.musicgameUIStateType>({
    key:"musicGameUIState",
    default:defaultMusicGameUIState
});

const musicGameModeState = atom<musicGameType.musicGameModeType>({
    key:"musicGameModeState",
    default:defaultMusicGameMode
});

const musicGamePauseState = atom<musicGameType.musicGamePauseState>({
    key:"musicGamePauseState",
    default:defaultMusicGamePauseState
})

const musicGameTimeState = atom<musicGameType.musicGameTimeType>({
    key:"musicGameTimeState",
    default:defaultMusicGameTime
});



export {
    defaultMusicGameValue,
    defaultMusicGameNotesJudge,
    defaultMusicGamePrediction,
    defaultMusicGameUIState,
    defaultMusicGameMode,
    defaultMusicGamePauseState,
    defaultMusicGameTime,

    musicGameValueState,
    musicGameNotesJudgeState,
    musicGamePredictionState,
    musicGameUIState,
    musicGameModeState,
    musicGamePauseState,
    musicGameTimeState,
}