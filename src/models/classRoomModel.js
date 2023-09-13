import mongoose from "mongoose";

const classRoomSchema = mongoose.Schema(
  {
    grade_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Grade",
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Teacher",
    },
    year: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ClassRoom = mongoose.model("ClassRoom", classRoomSchema);
