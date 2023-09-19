import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  createStudentClass,
  getAllRoomStudent,
  updateStudentClass,
} from "../../controllers/admin/classRoomStudents.js";

export const classRoomStudent = express.Router();

classRoomStudent.use(tokenValidation);

classRoomStudent.get("/", getAllRoomStudent);
classRoomStudent.post("/create", createStudentClass);
classRoomStudent.put("/:id", updateStudentClass);
