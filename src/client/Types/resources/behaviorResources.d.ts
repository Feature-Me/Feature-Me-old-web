interface behaviorContentMap {
    version: string
    type: "2d" | "3d"
    name: string
    models: {
        tap: string
        damageTap: string
        hold: string
        bright: string
        seed: string
        flick: string
        character: string
        ground: string
    }
    soundEffect?: string
    font: string

}


interface behaviorAssetContents {
    name: string
    type: "2d" | "3d"
    models: {
        tap: ArrayBuffer
        damageTap: ArrayBuffer
        hold: ArrayBuffer
        bright: ArrayBuffer
        seed: ArrayBuffer
        flick: ArrayBuffer
        character: ArrayBuffer
        ground: ArrayBuffer
    }
    soundEffect: string
    font?: any
}

interface soundEffectContentMap {
    name: string
    sound: {
        tap: string
        damage: string
        hold: string
        bright: string
        seed: string
        flick: string
        assist: string
    }
    license: string
}

interface soundEffectAssetContents {
    name: string
    sound: {
        tap:{
            data: ArrayBuffer
            mime: string
        }
        damage:{
            data: ArrayBuffer
            mime: string
        }
        hold:{
            data: ArrayBuffer
            mime: string
        }
        bright:{
            data: ArrayBuffer
            mime: string
        }
        seed:{
            data: ArrayBuffer
            mime: string
        }
        flick:{
            data: ArrayBuffer
            mime: string
        }
        assist:{
            data: ArrayBuffer
            mime: string
        }
    }
    license: string
}