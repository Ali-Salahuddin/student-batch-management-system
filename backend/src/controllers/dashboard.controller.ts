import { Request, Response } from "express";
import User from "../models/user.model";
import Batch from "../models/batch.model";

export const dashboard = async (
    req: Request,
    res: Response
) => {
    try {
        const totalUsers =
            await User.countDocuments();

        const totalStudents =
            await User.countDocuments({
                role: "student",
            });

        const totalTeachers =
            await User.countDocuments({
                role: "teacher",
            });

        const totalAdmins =
            await User.countDocuments({
                role: "admin",
            });

        const totalBatches =
            await Batch.countDocuments();

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
    } catch (error) {
        res.status(500).json({
            message: "Dashboard Error",
        });
    }
};