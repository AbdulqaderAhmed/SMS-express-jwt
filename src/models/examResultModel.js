import mongoose from "mongoose";

const examResultSchema = mongoose.Schema(
  {
    exam_ID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Exam",
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subject",
    },
    mark: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ExamResult = mongoose.model("ExamResutl", examResultSchema);
