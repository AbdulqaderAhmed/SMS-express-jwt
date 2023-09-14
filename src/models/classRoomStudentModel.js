import mongoose from "mongoose";

const classRoomStudentSchema = mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    classRoom_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ClassRoom",
    },
  },
  { timestamps: true }
);

export const classRoomStudent = mongoose.model(
  "ClassRoomStudent",
  classRoomStudentSchema
);
