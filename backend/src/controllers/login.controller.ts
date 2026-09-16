import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model"; 
 import jwt from "jsonwebtoken";   
// import { SignJWT } from "jose";
export const loginUser  = async (
    req: Request, res: Response) => {
    try {
        const { email, password } = req.body;   
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const isUser = await User.findOne({ email });
        if (!isUser) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        const isMatch = await bcrypt.compare(
            password,
            isUser.password
        );
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
        
    const token = jwt.sign(
  {
    userId: isUser._id,
    email: isUser.email,
    role: isUser.role,
  },
  process.env.JWT_SECRET as string,
  {
    expiresIn: "15m",
  }
);
res.cookie("token", token, {
  httpOnly: true,
  secure: false,      // true when using HTTPS in production
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
    } catch (error) {
        res.status(500).json({
            message: "Error logging in",    
            error,
        });
    }   
}
