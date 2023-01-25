class DatabaseError extends Error {
    constructor(error: string | undefined) {
        super(error)
        this.name = "DatabaseError";
    }
}

export default DatabaseError;