const scoreRanks: scoreRanks = [
    { label: "SSS+", min: 990000, max: 1000000 },
    { label: "SSS", min: 980000, max: 990000 },
    { label: "SS+", min: 970000, max: 980000 },
    { label: "SS", min: 950000, max: 970000 },
    { label: "S+", min: 940000, max: 950000 },
    { label: "S", min: 900000, max: 940000 },
    { label: "AAA+", min: 890000, max: 900000 },
    { label: "AAA", min: 870000, max: 890000 },
    { label: "AA+", min: 860000, max: 870000 },
    { label: "AA", min: 840000, max: 860000 },
    { label: "A+", min: 830000, max: 840000 },
    { label: "A", min: 800000, max: 830000 },
    { label: "B", min: 700000, max: 800000 },
    { label: "C", min: 600000, max: 700000 },
    { label: "D", min: 0, max: 600000 }
]

function getScoreRankFromScore(score: number) {
    const rank = scoreRanks.find(s => s.max >= score && s.min < score) || {label:"unkown",min:0,max:0};

    return rank.label;
}

export default getScoreRankFromScore