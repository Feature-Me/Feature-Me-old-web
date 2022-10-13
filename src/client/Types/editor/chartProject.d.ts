interface chartProjectType extends editorProjectBase {
    name: string
    type: "chart"
    metadata: {
        bpm: number
        composer: string
        license: string
        thumbnail: ArrayBuffer
        time: number
        created: number
        saved: number
    }
    music: Array<chartEditorMusic>
    chart: Array<chartEditorChart>
}

interface chartEditorMusic {
    name: string
    data: ArrayBuffer
    mime: string
}

interface chartEditorChart {
    name: string
    data: string
}