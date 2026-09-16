"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const batch_model_1 = __importDefault(require("../models/batch.model"));
const dashboard = async (req, res) => {
    try {
        const totalUsers = await user_model_1.default.countDocuments();
        const totalStudents = await user_model_1.default.countDocuments({
            role: "student",
        });
        const totalTeachers = await user_model_1.default.countDocuments({
            role: "teacher",
        });
        const totalAdmins = await user_model_1.default.countDocuments({
            role: "admin",
        });
        const totalBatches = await batch_model_1.default.countDocuments();
        res.status(200).json({
            message: "Dashboard fetched successfully",
            data: {
                totalUsers,
                totalStudents,
                totalTeachers,
                totalAdmins,
                totalBatches,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Dashboard Error",
        });
    }
};
exports.dashboard = dashboard;
