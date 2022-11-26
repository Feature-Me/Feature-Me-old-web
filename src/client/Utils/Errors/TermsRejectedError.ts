class TermsRejectedError extends Error {
    constructor(error: string | undefined){
        super(error)
        this.name = "TermsRejectedError";
    }
}

export default TermsRejectedError;