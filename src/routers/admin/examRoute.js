import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  createExam,
  updateExam,
} from "../../controllers/admin/examController.js";

export const exam = express.Router();

exam.use(tokenValidation);

exam.post("/create", createExam);
exam.put("/:id", updateExam);
