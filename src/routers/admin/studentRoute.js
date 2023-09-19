import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  getAllStudent,
  register,
  updateStudent,
} from "../../controllers/admin/studentController.js";

export const student = express.Router();

student.use(tokenValidation);

student.get("/", getAllStudent);
student.post("/create", register);
student.put("/:id", updateStudent);
