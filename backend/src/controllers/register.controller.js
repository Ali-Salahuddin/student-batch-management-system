"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUsers = exports.deleteUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const profileImage = req.file
            ? `/uploads/${req.file.filename}`
            : "";
        // Validation
        if (!name ||
            !email ||
            !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        // Check if user exists
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await user_model_1.default.create({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage,
        });
        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error,
        });
    }
};
exports.registerUser = registerUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // Prevent deleting yourself
        if (req.user?.userId === id) {
            return res.status(403).json({
                message: "You cannot delete your own account.",
            });
        }
        // Find the user first
        const user = await user_model_1.default.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        // Protect admin accounts
        if (user.role === "admin") {
            const adminCount = await user_model_1.default.countDocuments({
                role: "admin",
            });
            if (adminCount <= 1) {
                return res.status(403).json({
                    message: "Cannot delete the last admin account.",
                });
            }
            return res.status(403).json({
                message: "Admin accounts cannot be deleted.",
            });
        }
        // Delete only after all checks pass
        await user_model_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: "User deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error,
        });
    }
};
exports.deleteUser = deleteUser;
const getUsers = async (req, res) => {
    try {
        // const users = await User.find();
        // const users = await User.find().select("-password");
        const users = await user_model_1.default.find()
            .populate("batch", "courseName batchCode")
            .select("-password");
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching users ",
            error,
        });
    }
};
exports.getUsers = getUsers;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        // Copy incoming fields
        const updateData = {
            ...req.body,
        };
        if (updateData.batch === "") {
            delete updateData.batch;
        }
        // If a new profile image was uploaded
        if (req.file) {
            updateData.profileImage = `/uploads/${req.file.filename}`;
        }
        if (updateData.password) {
            updateData.password = await bcryptjs_1.default.hash(updateData.password, 10);
        }
        const updateduser = await user_model_1.default.findByIdAndUpdate(id, updateData, {
            // new: true,
            returnDocument: "after",
            runValidators: true,
        }).populate("batch", "courseName batchCode");
        ;
        if (!updateduser) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "User updated successfully",
            data: updateduser,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error,
        });
    }
};
exports.updateUser = updateUser;
