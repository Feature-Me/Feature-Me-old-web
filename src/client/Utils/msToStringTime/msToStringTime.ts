function msToStringTime(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${String(minutes).padStart(2, "0")} : ${seconds.padStart(2, "0")}`
}

export default msToStringTime;