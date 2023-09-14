import expressAsyncHandler from "express-async-handler";
import { classRoomStudent } from "../../models/classRoomStudentModel.js";

export const createStudentClass = expressAsyncHandler(async (req, res) => {
  const { student_id, classRoom_id } = req.body;
  if (!student_id || !classRoom_id) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const availableStudent = await classRoomStudent.findOne({ student_id });
  if (availableStudent) {
    res.status(409);
    throw new Error("Student already in this room");
  } else {
    const classRoom = await classRoomStudent.create({
      student_id,
      classRoom_id,
    });

    if (classRoom) {
      const room = await classRoomStudent.find();
      res.status(201).json(room);
    } else {
      res.status(400);
      throw new Error("Invalid data!");
    }
  }
});

export const updateStudentClass = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const editRoom = await classRoomStudent.findByIdAndUpdate(id, req.body);

  if (!editRoom) {
    res.status(404);
    throw new Error("Student can not found in this room!");
  } else {
    const room = await classRoomStudent.find();
    res.status(202).json(room);
  }
});
