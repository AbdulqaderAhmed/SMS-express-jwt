import expressAsyncHandler from "express-async-handler";
import { Exam } from "../../models/examModel.js";

export const createExam = expressAsyncHandler(async (req, res) => {
  const { examType_id, name, description } = req.body;
  if (!examType_id || !name || !description) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const availableName = await Exam.findOne({ name });
  if (availableName) {
    res.status(409);
    throw new Error("This Exam is already taken");
  } else {
    const test = await Exam.create({
      examType_id,
      name,
      description,
    });

    if (test) {
      const exams = await Exam.find();
      res.status(201).json(exams);
    } else {
      res.status(400);
      throw new Error("Something went wrong!");
    }
  }
});

export const updateExam = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;
  const editExam = await Exam.findByIdAndUpdate(id, req.body);

  if (!editExam) {
    res.status(404);
    throw new Error("No such Exam found!");
  } else {
    const exams = await Exam.find();
    res.status(202).json(exams);
  }
});
