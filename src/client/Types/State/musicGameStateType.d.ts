
interface MusicGameStateType {
    difficulty: "memory" | "advance" | "prospects" | "ozma" | ""
    mode: "solo" | "multi-royale" | "multi-team" | ""
    score: number
    chain: number
    accualy: number
    maxScore: number
    maxChain: number
    bpm: number
    UIVisibility: {
        visible: boolean
        details: boolean
    }
    time:{
        gameTime: number
        elapsedTime: number
    }
    judge: {
        stunninng: number
        glossy: number
        moderate: number
        lost: number
    }
    timing: {
        future: number
        past: number
    }
    prediction: {
        score: number
        rating: number
    }
}