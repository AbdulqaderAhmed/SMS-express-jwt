import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  createExamResult,
  updateExamResult,
} from "../../controllers/admin/examResultController.js";

export const examResult = express.Router();

examResult.use(tokenValidation);

examResult.post("/create", createExamResult);
examResult.put("/:id", updateExamResult);
