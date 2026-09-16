"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBatchStudents = exports.deleteBatchById = exports.getBatchById = exports.updateBatch = exports.getBatches = exports.createBatch = void 0;
const batch_model_1 = __importDefault(require("../models/batch.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const createBatch = async (req, res) => {
    try {
        const { courseName, instructor, batchCode, timing, classesPerWeek, classDays, durationMonths, startDate, fee, totalStudents, mode, } = req.body;
        if (!courseName ||
            !instructor ||
            !batchCode ||
            !timing ||
            !classesPerWeek ||
            !classDays ||
            !durationMonths ||
            !startDate ||
            !fee ||
            !totalStudents ||
            !mode) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const batch = await batch_model_1.default.create(req.body);
        res.status(201).json({
            message: "Batch created successfully",
            data: batch,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating batch",
            error,
        });
    }
};
exports.createBatch = createBatch;
const getBatches = async (req, res) => {
    try {
        const batches = await batch_model_1.default.aggregate([
            {
                $lookup: {
                    from: "users",
                    let: { batchId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$batch", "$$batchId"],
                                },
                                role: "student",
                            },
                        },
                    ],
                    as: "students",
                },
            },
            {
                $addFields: {
                    enrolledStudents: {
                        $size: "$students",
                    },
                },
            },
            {
                $project: {
                    students: 0,
                },
            },
        ]);
        return res.status(200).json({
            message: "Batches fetched successfully",
            data: batches,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error fetching batches",
            error,
        });
    }
};
exports.getBatches = getBatches;
const updateBatch = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBatch = await batch_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedBatch) {
            return res.status(404).json({
                message: "Batch not found",
            });
        }
        res.status(200).json({
            message: "Batch updated successfully",
            data: updatedBatch,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating batch",
            error,
        });
    }
};
exports.updateBatch = updateBatch;
const getBatchById = async (req, res) => {
    try {
        const batch = await batch_model_1.default.findById(req.params.id);
        if (!batch) {
            return res.status(404).json({
                message: "Batch not found",
            });
        }
        res.json(batch);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching batch",
        });
    }
};
exports.getBatchById = getBatchById;
const deleteBatchById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await batch_model_1.default.deleteMany({
            _id: id,
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "No batch found for this instructor",
            });
        }
        res.status(200).json({
            message: `${result.deletedCount} batch(es) deleted successfully`,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting batch",
            error,
        });
    }
};
exports.deleteBatchById = deleteBatchById;
const getBatchStudents = async (req, res) => {
    try {
        const { id } = req.params;
        const students = await user_model_1.default.find({
            role: "student",
            batch: id,
        })
            .select("-password")
            .populate("batch", "courseName batchCode");
        res.status(200).json({
            message: "Students fetched successfully",
            data: students,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching students",
            error,
        });
    }
};
exports.getBatchStudents = getBatchStudents;
