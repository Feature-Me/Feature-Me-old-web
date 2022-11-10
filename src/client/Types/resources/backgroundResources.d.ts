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
    alt?: {
        data: ArrayBuffer
        mime: string
    }
    skydata: {
        turbidity: number
        rayleigh: number
        mieCoeffient: number
        mieDirectionalG: number
        sunPhi: number
        sunTheta: number

    }
}
