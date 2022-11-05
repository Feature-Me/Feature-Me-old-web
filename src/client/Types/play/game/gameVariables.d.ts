import { note } from "Features/play/chartClass/notes"

interface musicGameVariablesType {
    activeRange: number
    activeRange: number
    activeNotes: Array<note>
    delay: number
    ready: boolean
    inputs: {
        position: "left" | "right" | "center",
        lanes: [boolean, boolean, boolean, boolean];
    },
    time: {
        initialVoidTime: number
        startTime: number
        elapsedTime: number
        gameTime: number
        judgeTime: number
        totalTime: number
    }
}