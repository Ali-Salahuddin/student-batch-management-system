"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const getProfile = async (req, res) => {
    try {
        const user = await user_model_1.default.findById(req.user?.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching profile",
        });
    }
};
exports.getProfile = getProfile;
