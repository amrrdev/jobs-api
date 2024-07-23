import AppError from "./../errors/appError.js";
import { StatusCodes } from "http-status-codes";

export default (req, res, next) => {
    next(new AppError(`Can't fint ${req.url} on this server`, StatusCodes.NOT_FOUND));
};
