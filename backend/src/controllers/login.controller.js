"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { SignJWT } from "jose";
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const isUser = await user_model_1.default.findOne({ email });
        if (!isUser) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, isUser.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        // const secret = new TextEncoder().encode(
        // process.env.JWT_SECRET
        // );
        // const token = await new SignJWT({
        //   userId: isUser._id.toString(),
        //   email: isUser.email,
        //   role: isUser.role,
        // })
        //   .setProtectedHeader({
        //     alg: "HS256",
        //   })
        //   .setExpirationTime("1d")
        //   .sign(secret);
        //   res.cookie(
        //   "token",
        //   token,
        //   {
        //     httpOnly: true,
        //     secure: false, // true in production with HTTPS
        //     sameSite: "lax",
        //     maxAge: 24 * 60 * 60 * 1000,
        //   }
        // );
        // res.status(200).json({
        //   message: "Login successful",
        // });
        const token = jsonwebtoken_1.default.sign({
            userId: isUser._id,
            email: isUser.email,
            role: isUser.role,
        }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true when using HTTPS in production
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: isUser._id,
                name: isUser.name,
                email: isUser.email,
                role: isUser.role,
            },
            // user: isUser,
            // token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error logging in",
            error,
        });
    }
};
exports.loginUser = loginUser;
