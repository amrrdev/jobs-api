import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "Please Provide A Company Name"],
            maxLength: 50,
        },
        position: {
            type: String,
            required: [true, "Please Provide A Position"],
            maxlength: 100,
        },
        status: {
            type: String,
            enum: ["interview", "declined", "pending"],
            default: "pending",
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide user"],
        },
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
