import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  register,
  updateTeacher,
} from "../../controllers/admin/teacherController.js";

export const teacher = express.Router();

teacher.use(tokenValidation);

teacher.post("/register", register);
teacher.put("/:id", updateTeacher);
