const convertAlphaToCurrentChart = require("./convertAlphaToCurrentChart");

const chart = require("./beatmap.json")

const fs = require("fs");

const data = convertAlphaToCurrentChart(chart);
fs.writeFileSync("./chart.json", JSON.stringify(data, null, 4));