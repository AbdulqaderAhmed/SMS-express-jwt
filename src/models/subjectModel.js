import mongoose from "mongoose";

export const subjectSchema = mongoose.Schema(
  {
    grade_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Grade",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Subject = mongoose.model("Subject", subjectSchema);
