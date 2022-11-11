import { note } from "Features/play/class/noteClass/notes"

interface musicGameVariablesType {
    activeRange: number
    activeRange: number
    activeNotes: Array<note>
    delay: number
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