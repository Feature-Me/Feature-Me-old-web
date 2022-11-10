interface behaviorContentMap {
    version: string
    type: "2d" | "3d"
    name: string
    made:"official"|"community"
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
    version:string
    name: string
    type: "2d" | "3d"
    made: "official" | "community"
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
    fontName?: string
    installedAt:number
}

interface soundEffectContentMap {
    version:string
    name: string
    made: "official" | "community"
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
    installedAt:number
}

interface soundEffectAssetContents {
    name: string
    sound: {
        tap: {
            data: ArrayBuffer
            mime: string
        }
        damage: {
            data: ArrayBuffer
            mime: string
        }
        hold: {
            data: ArrayBuffer
            mime: string
        }
        bright: {
            data: ArrayBuffer
            mime: string
        }
        seed: {
            data: ArrayBuffer
            mime: string
        }
        flick: {
            data: ArrayBuffer
            mime: string
        }
        assist: {
            data: ArrayBuffer
            mime: string
        }
    }
    license: string
}