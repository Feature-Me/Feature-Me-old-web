class ChartParserError extends Error {
    constructor(error: string | undefined) {
        super(error)
        this.name = "ChartParserError";
    }
}

export default ChartParserError;