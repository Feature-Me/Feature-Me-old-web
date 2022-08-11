type Musiccollection = {
    folders: Array<string>;
}

type musicDifficulties = "memory" | "advance" | "prospects" | "ozma" | "";

interface MusicAssetDifficultyMap {
    name: musicDifficulties
    chartFile: string
    level: number
    constant: number
    chartDesigner: string
}

interface MusicAssetMetadataMap {
    name: musicDifficulties
    chartFile?: string
    level: number
    constant: number
    chartDesigner: string
}

interface DirectingTextMap {
    type: "text"
    lngfiles: {
        [key: string]: string
    }
    fallback: string
}

interface musicMap {
    name: string
    src: string
}

type directingsMap = DirectingTextMap;

interface MusicAssetMap {
    title: string
    composer: string
    bpm: string
    time: {
        ms: number
        display: string
    }
    demo: {
        start: number
        end: number
    }
    backgroundData?: string | null
    backgroundType?: "image" | "video"
    behavior?: string | null
    license?: string
    thumbnail: string
    defaultMusic?: string
    music: Array<musicMap>
    directing?: Array<directingsMap>
    difficulties: Array<MusicAssetDifficultyMap>
}



interface musicData {
    name: string
    data: ArrayBuffer
    mime: string
}

interface difficultyData {
    name: musicDifficulties
    level: number
    constant: number
    chartDesigner: string
}
interface chartData {
    name: musicDifficulties
    data: string
}
interface DirectingText {
    type: "text"
    data: {
        [key: string]: string
    }
    fallback: string
}
type directings = DirectingText

interface MusicAssetContents {
    
    metadata: {
        title: string
        composer: string
        bpm: string,
        time: {
            ms: number
            display: string
        }
        demo: {
            start: number
            end: number
        }
        license: string
        thumbnail: {
            data: ArrayBuffer
            mime: string
        }
        defaultMusic: string
        selectedMusic: string
        background: {
            type: string
            data: ArrayBuffer
            mime: string
        } | null

        difficulties: Array<difficultyData>
    }
    directing: Array<directings>
    behavior: ArrayBuffer
    music: Array<musicData>
    chart: Array<chartData>
}