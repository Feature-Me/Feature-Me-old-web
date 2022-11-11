interface backgroundContentMap {
    name: string
    src: string
    made:"official"|"community"
    alt?: string
    scenes:[]
    skydata: {
        turbidity: number
        rayleigh: number
        mieCoeffient: number
        mieDirectionalG: number
        sunPhi: number
        sunTheta: number
    }
}


interface backgroundAssetContents {
    name: string
    data: ArrayBuffer
    made: "official" | "community"
    alt?: {
        data: ArrayBuffer
        mime: string
    }
    scenes:[]
    skydata: {
        turbidity: number
        rayleigh: number
        mieCoeffient: number
        mieDirectionalG: number
        sunPhi: number
        sunTheta: number
    }
    installedAt:number
}
