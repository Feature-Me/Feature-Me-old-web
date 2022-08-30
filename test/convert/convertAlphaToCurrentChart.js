const json5 = require("json5");
function convertAlphaToCurrentChart(alpha) {
    if (typeof alpha === "string")
        alpha = json5.parse(alpha);
    const chart = {
        metadata: {
            offset: alpha.offset || 0,
            initialBpm: alpha.BPM,
            scorePerNote: 0,
            chain: 0,
        },
        notes: [],
        effects: []
    };
    chart.notes = convertAlphaToCurrentNotes(alpha.notes, alpha.BPM);
    return chart;
}
function convertAlphaToCurrentNotes(alphaNotes, bpm) {
    let notes = [];
    for (const note of alphaNotes) {
        let position = convertAlphaToCurrentPosition(note.track);
        let data = {
            type: (position === null || position === void 0 ? void 0 : position.type) || "tap",
            lane: (position === null || position === void 0 ? void 0 : position.lane) || 1,
            time: (60 / bpm * note.count) * 1000,
        };
        notes.push(data);
    }
    return notes;
}
function convertAlphaToCurrentPosition(track) {
    if (track < 4)
        return { type: "tap", lane: track + 1 };
    if (track == 4)
        return { type: "bright" };
    if (track == 5)
        return { type: "seed", lane: "left" };
    if (track == 6)
        return { type: "seed", lane: "right" };
    return { type: "tap", lane: 1 };
}

module.exports = convertAlphaToCurrentChart;
//# sourceMappingURL=convertAlphaToCurrentChart.js.map