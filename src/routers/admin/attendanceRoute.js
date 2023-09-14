import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  createAttendance,
  updateAttendance,
} from "../../controllers/admin/attendanceController.js";

export const attendance = express.Router();

attendance.use(tokenValidation);

attendance.post("/create", createAttendance);
attendance.put("/:id", updateAttendance);
