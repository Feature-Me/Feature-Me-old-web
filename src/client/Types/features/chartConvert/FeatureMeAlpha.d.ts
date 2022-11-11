import { chartBrightNote, chartJsonType, chartSeedNote, chartTapNote } from "Features/play/parseChart/chartSample"

interface alphaNote {
    track: 0 | 1 | 2 | 3 | 4 | 5 | 6
    count: number
    speed?: {
        type: "absolute" | "relative" | "fixed"
        value: number
    }

}

interface alphaChartType {
    BPM: number
    offset: number
    /*
    duration:number
    title:string
    nd:string
    diff:string
    lev:string|number
    artist:string
    */
    notes: Array<alphaNote>
}

interface chartNoteFromAlpha {
    type: "tap" | "bright" | "seed"
    time: number
    lane?: 1 | 2 | 3 | 4 | 5 | 6 | "left" | "right"
    speed?: {
        type: "absolute" | "relative" | "fixed"
        value: number
    }
}

interface chartJsonFromAlpha extends chartJsonType {
    notes: Array<chartNoteFromAlpha>
}