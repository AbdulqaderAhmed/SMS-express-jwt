import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  createGrade,
  updateGrade,
} from "../../controllers/admin/gradeController.js";

export const grade = express.Router();

grade.use(tokenValidation);

grade.post("/create", createGrade);
grade.put("/:id", updateGrade);
