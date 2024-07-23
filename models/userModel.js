import mongoose from "mongoose";
import validator from "validator";

import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name"],
        maxLength: [20, "A tour name must have less or equal then 20 characters"],
        minLength: [3, "A tour name musta have more or equal than 3 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please tell us your email"],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
        minLength: [8, "A tour name musta have more or equal than 8 characters"],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (passwordConfirm) {
                return this.password === passwordConfirm;
            },
            message: "Passwords are not the same",
        },
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.isNew) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (requestBodyPassowrd, databaseUserPassword) {
    return await bcrypt.compare(requestBodyPassowrd, databaseUserPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
