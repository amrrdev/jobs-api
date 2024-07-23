import AppError from "../errors/appError.js";
import User from "../models/userModel.js";
import catchAsync from "./../errors/catchAsync.js";
import { generateJwtToken, verifyJwtToken } from "./jwt-utils.js";

import { StatusCodes } from "http-status-codes";

export const register = catchAsync(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });
    const token = generateJwtToken({ id: user._id, name: user.name });

    res.status(StatusCodes.CREATED).json({
        status: "success",
        token,
        data: { user },
    });
});
export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new AppError("missing email or password", StatusCodes.BAD_REQUEST));

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password)))
        return next(new AppError("Invalid Email Or Password!", StatusCodes.UNAUTHORIZED));

    const token = generateJwtToken({ id: user._id, name: user.name });
    res.status(StatusCodes.OK).json({
        status: "success",
        token,
        data: { user },
    });
});

export const proetct = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];

    if (!token)
        return next(
            new AppError(
                "Your are not logged in! Please log in to get access",
                StatusCodes.UNAUTHORIZED
            )
        );
    // console.log(req.headers.authorization);
    const decoded = await verifyJwtToken(token);

    // check if the user still exist
    const freshUser = await User.findById(decoded.id);

    req.user = freshUser;
    next();
});
