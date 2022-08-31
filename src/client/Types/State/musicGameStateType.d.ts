import { chartType } from "Features/parseChart/chartSample"
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader"

interface musicGameValueType {
    score:number
    chain:number
    maxChain:number
    bpm:number
}

interface musicGameNotesJudgeType {
    notesCount:{
        all:number,
        current:number
    }
    accuracy:number
    judge: {
        [key:judgeText]:number;
        stunning: number
        glossy: number
        moderate: number
        lost: number
    }
    timing: {
        future: number
        past: number
    }
}

interface musicGamePredictionType {
    rating: number
    score: number
}

interface musicgameUIStateType{
    visibility:boolean
}

interface musicGameModeType{
    difficulty: "memory" | "advance" | "prospects" | "ozma" 
    mode: "solo" | "multi-royale" | "multi-team" | "auto"
    level:number
    constant:number
}
interface musicGamePauseState {
    ready: boolean
    paused: boolean
}

interface musicGameTimeType{
    totalTime:number
    pausedDuration:number
}
