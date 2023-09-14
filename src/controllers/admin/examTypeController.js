import expressAsyncHandler from "express-async-handler";
import { ExamType } from "../../models/examTypeModel.js";

export const createExamType = expressAsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400);
    throw new Error("Please provide all the required fields");
  }

  const availableName = await ExamType.findOne({ name });
  if (availableName) {
    res.status(409);
    throw new Error(`The exam type with this ${name} already exists`);
  } else {
    const type = await ExamType.create({
      name,
      description,
    });

    if (type) {
      const examTypes = await ExamType.find();
      res.status(201).json(examTypes);
    } else {
      res.status(400);
      throw new Error("Unable to add a new exam type!");
    }
  }
});

export const updateExamType = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;
  const editUpdateExamType = await ExamType.findByIdAndUpdate(id, req.body);

  if (!editUpdateExamType) {
    res.status(404);
    throw new Error("No such exam type found");
  } else {
    const examTypes = await ExamType.find();
    res.status(201).json(examTypes);
  }
});
