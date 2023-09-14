import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import { createStudentClass, updateStudentClass } from "../../controllers/admin/classRoomStudents.js";

export const classRoomStudent = express.Router();

classRoomStudent.use(tokenValidation);

classRoomStudent.post('/create', createStudentClass)
classRoomStudent.post('/:id', updateStudentClass)
