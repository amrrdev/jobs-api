import mongoose from "mongoose";

export default (url) => {
    return mongoose.connect(url);
};
