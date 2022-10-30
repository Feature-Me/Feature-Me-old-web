interface chartEditorType {
    project:chartProjectType
    page:"overview"|"metadata"|"music"|"chart",
    saved:boolean
    statusbar:Array<stausbarContent>
}

interface stausbarContent {
    id:string
    label:string
    onClick?:Function
    customValue:any
}