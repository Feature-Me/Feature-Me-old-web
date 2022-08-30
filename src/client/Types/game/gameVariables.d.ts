import { note } from "Features/chartClass/notes"

interface musicGameVariablesType {
    startTime:number
    initialVoidTime:number
    activeNotes:Array<note>
    delay:number
    ready:boolean
    inputs:{
        position:"left"|"right"|"center",
        lanes:[boolean,boolean,boolean,boolean];
    }
}