import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  batchCode: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  classesPerWeek: {
    type: Number,
    required: true,
  },
  classDays: {
    type: [Number],
    required: true,
  },
  durationMonths: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  totalStudents: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Batch", batchSchema);