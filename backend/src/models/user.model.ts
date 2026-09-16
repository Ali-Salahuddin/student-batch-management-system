import mongoose from "mongoose";
import { IUser } from "../data/typeofdata/usermodeltypes";

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    default: "student",
  },

  profileImage: {
    type: String,
    default: "",
  },

  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    default: null,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;