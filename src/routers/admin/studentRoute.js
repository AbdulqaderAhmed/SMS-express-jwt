import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  register,
  updateStudent,
} from "../../controllers/admin/studentController.js";

export const student = express.Router();

student.use(tokenValidation);

student.post("/register", register);
student.post("/:id", updateStudent);
