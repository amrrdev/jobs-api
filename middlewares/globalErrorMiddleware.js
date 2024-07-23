import { StatusCodes } from "http-status-codes";
import AppError from "../errors/appError.js";

const duplicateKeyError = (err) => {
    const message = `Duplicate value on ${Object.values(
        err.keyValue
    )} value please use another value`;
    return new AppError(message, StatusCodes.BAD_REQUEST);
};
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path} is ${err.value}`;
    return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleValidationError = (err) => {
    const message = err.errors.name.message;
    return new AppError(message, StatusCodes.BAD_REQUEST);
};

const sendError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

export default (err, req, res, next) => {
    // console.log(err);
    err.statusCode ||= StatusCodes.INTERNAL_SERVER_ERROR;
    err.status ||= "error";
    err.message ||= "Something went wrong";
    if (err.code && err.code === 11000) err = duplicateKeyError(err);
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.name === "ValidationError") err = handleValidationError(err);
    sendError(err, res);
};
