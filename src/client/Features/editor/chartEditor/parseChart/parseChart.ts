import json5 from "json5";
import ChartParserError from "Utils/Errors/chartParserError";

function parseEditorChart(chart:string){
    let returnChart = {
        notes:[],
        effects:[]
    }
    try {
        let chartObject = json5.parse(chart)
        if(!chartObject.notes) chartObject.notes = [];
        if (!chartObject.effects) chartObject.effects = [];
        returnChart = {...chartObject}
    } catch (error) {
        if(error instanceof Error)
            throw new ChartParserError(error.message);
        else throw new ChartParserError("An Error ha occured")
        
    }
    return returnChart
}
export default parseEditorChart;