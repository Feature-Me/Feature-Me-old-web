interface backgroundContentMap {
    name: string
    src: string
    alt?: string
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
