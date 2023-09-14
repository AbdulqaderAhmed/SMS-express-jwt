import expressAsyncHandler from "express-async-handler";
import { Attendance } from "../../models/attendanceModel.js";

export const createAttendance = expressAsyncHandler(async (req, res) => {
  const { student_id, date, status } = req.body;
  if (!student_id || !date || !status) {
    res.status(400);
    throw new Error("Please provide all the required fields!");
  }

  const availableStudent = await Attendance.findOne({ student_id });
  if (availableStudent) {
    res.status(409);
    throw new Error(`The attendance for ${student_id} is already created!`);
  } else {
    const attend = await Attendance.create({
      student_id,
      date,
      status,
    });

    if (attend) {
      const attendance = await Attendance.find();
      res.status(201).json(attendance);
    } else {
      res.status(400);
      throw new Error("Unable to add attendance!");
    }
  }
});

export const updateAttendance = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const editAttendance = await Attendance.findByIdAndUpdate(id, req.body);

  if (!editAttendance) {
    res.status(404);
    throw new Error("No attendace found!");
  } else {
    const attendance = await Attendance.find();
    res.status(202).json(attendance);
  }
});
