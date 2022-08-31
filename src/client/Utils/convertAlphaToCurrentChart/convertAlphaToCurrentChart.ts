import { chartBrightNote, chartJsonType, chartSeedNote, chartTapNote, chartType } from "Features/parseChart/chartSample";
import json5 from "json5";
import { match } from "ts-pattern";

function convertAlphaToCurrentChart(alpha: any):chartJsonType {
    if(typeof alpha === "string") alpha = json5.parse(alpha)
    const chart = {
        metadata: {
            offset: alpha.offset || 0,
            initialBpm: alpha.BPM,
            scorePerNote: 0,
            chain: 0,
        },
        notes: [],
        effects: []
    }
    chart.notes = convertAlphaToCurrentNotes(alpha.notes,alpha.BPM)
    return chart;
}

interface AlphaNote {
    track: number
    count: number
    damage?: boolean
}

type alphaTrack = 0|1|2|3|4|5|6;

interface AlphaPosition {
    type: "tap" | "bright" | "seed" 
    lane?: 1 | 2 | 3 | 4 | "left" | "right"
}




function convertAlphaToCurrentNotes(alphaNotes:Array<AlphaNote>,bpm:number):any{
    let notes = []
    for (const note of alphaNotes) {
        let position = convertAlphaToCurrentPosition(note.track as alphaTrack);
        let data = {
            type: position?.type || "tap",
            lane: position?.lane || 1,
            time: (60/bpm * note.count) *1000,
        }
        notes.push(data)
    }
    return notes;
}

function convertAlphaToCurrentPosition(track:alphaTrack):AlphaPosition{
    if(track < 4) return {type:"tap",lane:(track+1 as 1|2|3|4)};
    if(track == 4) return {type:"bright"};
    if(track == 5) return {type:"seed",lane:"left"};
    if(track == 6) return {type:"seed",lane:"right"};
    return {type: "tap",lane: 1}
}