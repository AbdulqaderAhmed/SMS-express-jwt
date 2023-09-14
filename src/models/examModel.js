import mongoose from "mongoose";

export const examSchema = mongoose.Schema(
  {
    examType_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ExamType",
    },
    name: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Exam = mongoose.model("Exam", examSchema);
