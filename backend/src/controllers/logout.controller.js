"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = (req, res) => {
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
exports.logout = logout;
