import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  createExamType,
  updateExamType,
} from "../../controllers/admin/examTypeController.js";

export const examType = express.Router();

examType.use(tokenValidation);

examType.post("/create", createExamType);
examType.put("/:id", updateExamType);
