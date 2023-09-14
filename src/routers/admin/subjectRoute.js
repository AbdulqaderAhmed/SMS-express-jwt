import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  createSubject,
  updateSubject,
} from "../../controllers/admin/subjectController.js";

export const subject = express.Router();

subject.use(tokenValidation);

subject.post("/create", createSubject);
subject.put("/:id", updateSubject);
