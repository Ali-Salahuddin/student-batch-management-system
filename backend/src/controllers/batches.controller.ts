import { batchesdata } from "../data/batchesdata";
import { Request, Response } from "express";
import batchesroutes from "../routes/batchesroutes";
import Batch from "../models/batch.model";
import User from "../models/user.model";
export const createBatch = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      courseName,
      instructor,
      batchCode,
      timing,
      classesPerWeek,
      classDays,
      durationMonths,
      startDate,
      fee,
      totalStudents,
      mode,
    } = req.body;

    if (
      !courseName ||
      !instructor ||
      !batchCode ||
      !timing ||
      !classesPerWeek ||
      !classDays ||
      !durationMonths ||
      !startDate ||
      !fee ||
      !totalStudents ||
      !mode
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const batch = await Batch.create(req.body);

    res.status(201).json({
      message: "Batch created successfully",
      data: batch,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating batch",
      error,
    });
  }
};
export const getBatches = async (
  req: Request,
  res: Response
) => {
  try {
    const batches = await Batch.aggregate([
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

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching batches",
      error,
    });
  }
};
export const updateBatch = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const updatedBatch = await Batch.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBatch) {
      return res.status(404).json({
        message: "Batch not found",
      });
    }

    res.status(200).json({
      message: "Batch updated successfully",
      data: updatedBatch,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating batch",
      error,
    });
  }
};


export const getBatchById = async (
  req: Request,
  res: Response
) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({
        message: "Batch not found",
      });
    }

    res.json(batch);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching batch",
    });
  }
};


export const deleteBatchById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await Batch.deleteMany({
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
  } catch (error) {
    res.status(500).json({
      message: "Error deleting batch",
      error,
    });
  }
};
export const getBatchStudents = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const students = await User.find({
      role: "student",
      batch: id,
    })
      .select("-password")
      .populate("batch", "courseName batchCode");

    res.status(200).json({
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error,
    });
  }
};
