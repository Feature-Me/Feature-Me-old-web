import { chartJsonType, chartNoteType, chartType, chartEffectType } from "./chartSample";
import { match } from "ts-pattern";
import { brightNote, damageTapNote, flickNote, holdNote, seedNote, tapNote } from "../chartClass/notes";

import databaseInfo from "../../Config/databaseinfo.json";
import version from "../../Config/versions.json";
import { cameraEffect, speedEffect } from "../chartClass/effects";


async function parseChart(chart:string){

    const gameConfig = JSON.parse(localStorage.getItem("gameConfig") || "{}");

    const chartJson = JSON.parse(chart) as chartJsonType;
    const chartData:chartType = {
        metadata: {
            offset: chartJson.metadata.offset || 0,
            initialBpm: chartJson.metadata.initialBpm || 120
        },
        notes: [],
        effects: []
    };

    const checkNoteType = (note: chartNoteType) => {
        return match(note)
            .with({type:"tap"},(note)=>{
                return new tapNote(note)
            })
            .with({type:"damagetap"},(note)=>{
                return new damageTapNote(note)
            })
            .with({type:"hold"},(note)=>{
                return new holdNote(note)
            })
            .with({type:"bright"},(note)=>{
                return new brightNote(note)
            })
            .with({type:"seed"},(note)=>{
                return new seedNote(note)
            })
            .with({type:"flick"},(note)=>{
                return new flickNote(note)
            })
            .exhaustive()
    }

    const checkEffectType = (effect: chartEffectType) => {
        return match(effect)
            .with({type:"camera"},(effect)=>{
                return new cameraEffect(effect)
            })
            .with({type:"speed"},(effect)=>{
                return new speedEffect(effect)
            })
            // will be added later
            .with({type:"text"},(effect)=>{
                return effect
            })
            .with({type:"bpm"},(effect)=>{
                return effect
            })
            .exhaustive()
    }

    for (const note of chartJson.notes) {
        const noteInstance = checkNoteType(note);
        chartData.notes.push(noteInstance);
    }

    for (const effect of chartJson.effects) {
        const effectInstance = checkEffectType(effect);
        chartData.effects.push(effectInstance);
    }

    return chartData;
}

export default parseChart;