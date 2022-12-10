function timeToBeat(time:number,bpm:number,autoFix=false){
    if(autoFix) return Number((time/(1000/bpm)/60).toFixed(4));
    else return time/(1000/bpm)/60;
}

function beatToTime(beat:number,bpm:number,autoFix=false){
    if (autoFix) return Number(((60 / bpm * beat) * 1000).toFixed(4));
    else return (60 / bpm * beat) * 1000;
}

export {timeToBeat,beatToTime};