import expressAsyncHandler from "express-async-handler";
import { Grade } from "../../models/gradeModel.js";

export const createGrade = expressAsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400);
    throw new Error("Fields are required!");
  }

  const availableName = await Grade.findOne({ name });
  if (availableName) {
    res.status(409);
    throw new Error("Grade is in use!");
  } else {
    const grade = await Grade.create({
      name,
      description,
    });

    if (grade) {
      const allGrade = await Grade.find();
      res.status(201).json(allGrade);
    } else {
      res.status(400);
      throw new Error("Failed to add a new grade!");
    }
  }
});

export const updateGrade = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const editGrade = await Grade.findByIdAndUpdate(id, req.body);

  if (!editGrade) {
    res.status(404);
    throw new Error("No such grade found!");
  } else {
    const grade = await Grade.find();
    res.status(202).json(grade);
  }
});
