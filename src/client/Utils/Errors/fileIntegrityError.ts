class IntegrityError extends Error {
    constructor(error: string | undefined) {
        super(error)
        this.name = "FileIntegrityError";
    }
}

export default IntegrityError;