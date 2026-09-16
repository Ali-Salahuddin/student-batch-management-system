"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const batchSchema = new mongoose_1.default.Schema({
    courseName: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    batchCode: {
        type: String,
        required: true,
    },
    timing: {
        type: String,
        required: true,
    },
    classesPerWeek: {
        type: Number,
        required: true,
    },
    classDays: {
        type: [Number],
        required: true,
    },
    durationMonths: {
        type: Number,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    totalStudents: {
        type: Number,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Batch", batchSchema);
