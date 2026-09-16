import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { jwtVerify } from "jose";
import { AuthRequest } from "../data/typeofdata/auth.type";
export const authenticate =  (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // const authHeader =
    //   req.headers.authorization;

    // if (!authHeader) {
    //   return res.status(401).json({
    //     message: "Token missing",
    //   });
    // }

    // const token =authHeader.split(" ")[1];
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token missing",
      });
    }
    const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET as string
) as {
  userId: string;
  email: string;
  role: string;
};
console.log("Decoded User:", decoded);
req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};