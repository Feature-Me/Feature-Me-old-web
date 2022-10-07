interface editorVisibleProject {
    name:string
    id:string
    type:"chart"|"behavior"
    saved:number
    to:string
}

interface editorProjectBase {
    name:string
    id:string
    type: "chart" | "behavior"
}

type editorVisibleProjects = Array<editorVisibleProject>
type getEditorProject = chartProjectType