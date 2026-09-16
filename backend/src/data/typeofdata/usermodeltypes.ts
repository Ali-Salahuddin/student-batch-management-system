import mongoose, {
  Document,
} from "mongoose";

export interface IUser
  extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "teacher" | "student";
    profileImage: string;
     batch?: mongoose.Types.ObjectId | null;
}