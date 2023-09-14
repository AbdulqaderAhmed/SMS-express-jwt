import mongoose from "mongoose";

const parentSchema = mongoose.Schema(
  {
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
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Parent = mongoose.model("Parent", parentSchema);
