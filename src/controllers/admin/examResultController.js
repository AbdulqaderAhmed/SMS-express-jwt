import expressAsyncHandler from "express-async-handler";
import { ExamResult } from "../../models/examResultModel.js";

export const createExamResult = expressAsyncHandler(async (req, res) => {
  const { exam_id, student_id, subject_id, mark } = req.body;
  if (!exam_id || !student_id || !subject_id || !mark) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const availableStudent = await ExamResult.findOne({ student_id });
  const availableSubject = await ExamResult.findOne({ subject_id });

  if (availableStudent) {
    res.status(409);
    throw new Error(
      `The exam result for the given ${student_id} already exists!`
    );
  } else if (availableSubject) {
    res.status(409);
    throw new Error(
      `The exam result for the given ${subject_id} already exists!`
    );
  } else {
    const result = await ExamResult.create({
      exam_id,
      student_id,
      subject_id,
      mark,
    });

    if (result) {
      const exam = await ExamResult.find();
      res.status(201).json(exam);
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  }
});

export const updateExamResult = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const editExamResult = await ExamResult.findByIdAndUpdate(id, req.body);

  if (!editExamResult) {
    res.status(404);
    throw new Error(`No record found with`);
  } else {
    const exam = await ExamResult.find();
    res.status(202).json(exam);
  }
});
