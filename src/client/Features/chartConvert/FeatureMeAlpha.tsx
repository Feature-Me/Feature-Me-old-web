import { chartBrightNote, chartJsonType, chartSeedNote, chartTapNote } from "Features/parseChart/chartSample";
import json5 from "json5"
import { alphaChartType, alphaNote, chartJsonFromAlpha, chartNoteFromAlpha } from "Types/features/chartConvert/FeatureMeAlpha";


function convertAlphaChart(convertType: boolean, chart: string): string {

    //FMAlpha to Feature ME
    if (convertType) chart = FMAlphaToFM(chart)
    else chart = FMToFMAlpha(chart)

    return chart
}

//alpha json to fm json(fmc)
function FMAlphaToFM(chart: string): string {
    let chartString: string = "";

    function getType(track: alphaNote["track"]): "tap" | "bright" | "seed" {
        if (track < 4) return "tap";
        if (track == 4) return "bright";
        else return "seed"
    }

    function getLane(track: alphaNote["track"]): chartNoteFromAlpha["lane"] {
        if (track < 4) return track + 1 as 1 | 2 | 3 | 4;
        else if (track == 4) return undefined;
        else if (track == 5) return "left";
        else if (track == 6) return "right";
        else return 1
    }

    try {
        const alphaChart: alphaChartType = json5.parse(chart);
        const newChart: chartJsonFromAlpha = {
            metadata: {
                offset: alphaChart.offset || 0,
                initialBpm: alphaChart.BPM
            },
            notes: [],
            effects: []
        };
        for (const note of alphaChart.notes) {
            const newNotetype = getType(note.track)
            const newNote: chartNoteFromAlpha = {
                type: newNotetype,
                time: (60 / alphaChart.BPM * note.count) * 1000,
                lane: getLane(note.track)
            }
            newChart.notes.push(newNote)
        }
        console.log(newChart);

        chartString = json5.stringify(newChart, null, 4)

    } catch (error) {
        console.log(error);
        if (error instanceof Error) throw error
    }
    return chartString
}

//fm json(fmc) to alpha json
function FMToFMAlpha(chart: string): string {
    let chartString: string = "";

    function convertNoteType(note: chartTapNote | chartBrightNote | chartSeedNote): alphaNote["track"] {
        if (note.type == "tap") return note.lane - 1 as 0 | 1 | 2 | 3;
        if (note.type == "bright") return 4;
        else return (note.lane == "left" ? 5 : 6)
    }
    try {
        const FMChart: chartJsonType = json5.parse(chart);
        const AlphaChart: alphaChartType = {
            BPM: FMChart.metadata.initialBpm,
            offset: FMChart.metadata.offset,
            notes: []
        }

        for (const note of FMChart.notes) {
            if (note.type == "tap" || note.type == "bright" || note.type == "seed") {
                const pos = convertNoteType(note)
                const alphaNote: alphaNote = {
                    track: pos,
                    count: note.time / 500
                }
                AlphaChart.notes.push(alphaNote)
            }
        }
        chartString = json5.stringify(AlphaChart, null, 4);

    } catch (error) {
        console.log(error);
        if (error instanceof Error) throw error
    }
    return chartString
}

export default convertAlphaChart;