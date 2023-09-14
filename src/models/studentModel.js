import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Parent",
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    DOJ: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
