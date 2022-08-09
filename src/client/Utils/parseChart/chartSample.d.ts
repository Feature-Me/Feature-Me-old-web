import { tapNote, damageTapNote, holdNote, brightNote, seedNote, flickNote } from "../chartClass/notes";
import easing from "../easing/easing";

interface chartNote {
    type: "tap" | "damagetap" | "hold" | "bright" | "seed" | "flick"
    time: number
    //lane: 1 | 2 | 3 | 4 | "left" | "right"
    script?: Array<string>
    transitionEase?: keyof typeof easing | string //((pos: number) => number)
}

interface chartTapNote extends chartNote {
    type: "tap"
    lane: 1 | 2 | 3 | 4
}

interface chartDamageTapNote extends chartNote {
    type: "damagetap"
    lane: 1 | 2 | 3 | 4
}

interface chartHoldNote extends chartNote {
    type: "hold"
    duration: number
    lane: 1 | 2 | 3 | 4
}

interface chartBrightNote extends chartNote {
    type: "bright"
}

interface chartSeedNote extends chartNote {
    type: "seed"
    lane: "left" | "right"
}

interface chartFlickNote extends chartNote {
    type: "flick"
    lane: "left" | "right"
    direction: "left" | "right"
}


interface chartEffect {
    type: "camera" | "speed" | "text" | "bpm"
    time: number
}

interface chartCameraEffect extends chartEffect {
    type: "camera"
    position?: THREE.Vector3Tuple
    rotation?: THREE.Vector3Tuple
    zoom?: number
    fov?: number
    transitionTime?: number
    transitionEase?: keyof typeof easing | string //((pos: number) => number)
}

interface chartSpeedEffect extends chartEffect {
    type: "speed"
    speedType: "absolute" | "relative" | "fixedTime"
    speed: number
}

interface chartTextEffect extends chartEffect {
    type: "text"
    time: number
    duration: number
    textType : "string" | "lng"
    data: string
}

interface chartBpmEffect extends chartEffect {
    type: "bpm"
    bpm: number
}

type chartNoteType = chartTapNote | chartDamageTapNote | chartHoldNote | chartBrightNote | chartSeedNote | chartFlickNote
type chartEffectType = chartCameraEffect | chartSpeedEffect | chartTextEffect | chartBpmEffect
interface chartJsonType {
    metadata: {
        offset: number
        initialBpm: number
    }
    notes: Array<chartTapNote | chartDamageTapNote | chartHoldNote | chartBrightNote | chartSeedNote | chartFlickNote>
    effects: Array<chartCameraEffect | chartSpeedEffect>
}

interface chartType {
    metadata: {
        offset: number
        initialBpm: number
    }
    notes: Array<tapNote|damageTapNote|holdNote|brightNote|seedNote|flickNote>
    effects: Array<chartEffect>
}