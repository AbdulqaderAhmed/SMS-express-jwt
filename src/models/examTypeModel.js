import mongoose from "mongoose";

export const examTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ExamType = mongoose.model("ExamType", examTypeSchema);
