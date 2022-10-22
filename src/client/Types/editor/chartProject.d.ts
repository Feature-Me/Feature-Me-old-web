interface chartProjectType extends editorProjectBase {
    name: string
    type: "chart"
    metadata: {
        bpm: number
        composer: string
        license: string
        thumbnail: {
            data:ArrayBuffer
            mime:string
        }
        license?: string
        time: number
        demo: {
            start: number
            end: number
        }
        created: number
        saved: number
        defaultMusic: string
    }
    music: Array<chartEditorMusic>
    chart: Array<chartEditorChart>
}

interface chartEditorMusic {
    name: string
    data: ArrayBuffer
    mime: string
    time: number
}

interface chartEditorChart {
    name: string
    level:number
    constant:number
    data: string
}