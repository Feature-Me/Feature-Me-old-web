import { chartBrightNote, chartSeedNote, chartTapNote} from "Features/parseChart/chartSample";
import json5 from "json5"
import { alphaChartType, chartJsonFromAlpha, chartNoteFromAlpha } from "Types/features/chartConvert/FeatureMeAlpha";


function convertAlphaChart(convertType: boolean, chart: string): string {

    //FMAlpha to Feature ME
    if (convertType) chart = FMAlphaToFM(chart)
    else chart = FMToFMAlpha(chart)

    return chart
}

//alpha json to fm json(fmc)
function FMAlphaToFM(chart: string): string {
    console.log(chart);
    
    const alphaChart:alphaChartType = json5.parse(chart);
    const newChart: chartJsonFromAlpha = {
        metadata: {
            offset: alphaChart.offset || 0,
            initialBpm:alphaChart.BPM
        },
        notes: [] ,
        effects: []
    };
    let chartString:string = "";

    function getType (track:number):"tap"|"bright"|"seed" {
        if(track<4) return "tap";
        if(track==4)return "bright";
        else return "seed"
    }

    function getLane(track: number): chartNoteFromAlpha["lane"]{
        if (track < 4) return track+1 as 1|2|3|4|5|6;
        else if (track == 4) return undefined;
        else if(track == 5) return "left";
        else if(track==6) return "right";
        else return 1
    }

    try {
        for (const note of alphaChart.notes) {
            const newNotetype = getType(note.track)
            const newNote:chartNoteFromAlpha = {
                type:newNotetype,
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
    return ""
}

export default convertAlphaChart;