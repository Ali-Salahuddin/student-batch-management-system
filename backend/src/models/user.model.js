"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "teacher", "student"],
        default: "student",
    },
    profileImage: {
        type: String,
        default: "",
    },
    batch: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Batch",
        default: null,
    },
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
