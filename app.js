import jobRouter from "./routes/jobRouters.js";
import userRouter from "./routes/userRouters.js";
import globalErrorMiddleware from "./middlewares/globalErrorMiddleware.js";
import notFountMiddleware from "./middlewares/notFountMiddleware.js";

import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limiter";

const app = express();

// Set Security http headers
app.use(helmet());

// Enable CORS for all routes
app.use(cors());

//  limit number of requests that hit the server in specific period of time
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: "Too Many Requests From This IP, plases try again in an hour",
});

app.use(limiter);

// parse incoming json data into req.body
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter);

app.use("*", notFountMiddleware);
app.use(globalErrorMiddleware);

export default app;
