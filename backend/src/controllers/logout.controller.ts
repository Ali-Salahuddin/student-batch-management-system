import { Request, Response } from "express";

export const logout = (
  req: Request,
  res: Response
) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};