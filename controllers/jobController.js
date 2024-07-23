import AppError from "./../errors/appError.js";
import catchAsync from "../errors/catchAsync.js";
import Job from "../models/jobModel.js";

import { StatusCodes } from "http-status-codes";

export const getAllJobs = catchAsync(async (req, res, next) => {
    const jobs = await Job.find({ createdBy: req.user.id }).sort("-createdAt");
    res.status(StatusCodes.OK).json({
        status: "success",
        length: jobs.length,
        data: { jobs },
    });
});

export const createJob = catchAsync(async (req, res, next) => {
    const newJob = await Job.create({
        company: req.body.company,
        position: req.body.position,
        createdBy: req.user.id,
        status: req.body.status || "pending",
    });
    res.status(StatusCodes.CREATED).json({
        status: "success",
        data: { job: newJob },
    });
});

export const getJob = catchAsync(async (req, res, next) => {
    const jobId = req.params.id;
    const userId = req.user.id;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });

    if (!job) return next(new AppError("there is no job with this id", StatusCodes.NOT_FOUND));

    res.status(StatusCodes.OK).json({
        status: "success",
        data: { job },
    });
});

export const updateJob = catchAsync(async (req, res, next) => {
    const jobId = req.params.id;
    const userId = req.user.id;

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
        runValidators: true,
        new: true,
    });

    if (!updatedJob)
        return next(new AppError("there is no job with this id", StatusCodes.NOT_FOUND));
    res.status(StatusCodes.OK).json({
        status: "success",
        data: { job: updatedJob },
    });
});

export const deleteJob = catchAsync(async (req, res, next) => {
    const jobId = req.params.id;
    const userId = req.user.id;

    const deletedJob = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

    res.status(StatusCodes.OK).json({
        status: "success",
        message: "Job deleted successfully",
    });
});
