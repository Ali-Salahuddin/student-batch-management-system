import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { AuthRequest } from "../data/typeofdata/auth.type";
export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    
    const { name, email, password, role } = req.body;

const profileImage = req.file
  ? `/uploads/${req.file.filename}`
  : "";

    // Validation
    if (
      !name ||
      !email ||
      !password || !role
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user exists
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    
      const user = await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    profileImage,
                  });
    res.status(201).json({
      message:
        "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Error registering user",
      error,
    });
  }
};
export const deleteUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Prevent deleting yourself
    if (req.user?.userId === id) {
      return res.status(403).json({
        message: "You cannot delete your own account.",
      });
    }

    // Find the user first
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Protect admin accounts
    if (user.role === "admin") {
      const adminCount = await User.countDocuments({
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
    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error,
    });
  }
};
export const getUsers = async (
  req: Request,res: Response ) => {
  try {
    // const users = await User.find();
    // const users = await User.find().select("-password");
    const users = await User.find()
  .populate("batch", "courseName batchCode")
  .select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users ",
      error,
    });
  }
};
export const updateUser = async (
   req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    // Copy incoming fields
    const updateData: any = {
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
      updateData.password = await bcrypt.hash(
        updateData.password,
        10
      );
    }

    const updateduser = await User.findByIdAndUpdate(
      id,
      updateData,
      {
        // new: true,
        returnDocument: "after",
        runValidators: true,
      }
    ).populate("batch", "courseName batchCode");;

    if (!updateduser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updateduser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error,
    });
  }
};