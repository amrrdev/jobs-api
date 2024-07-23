export default class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith("4") ? "fail" : "error";

        // create .stack properity to detect where that error happen and execlude the class
        Error.captureStackTrace(this, this.constructor);
    }
}
