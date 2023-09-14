import expressAsyncHandler from "express-async-handler";
import { Subject } from "../../models/subjectModel.js";

export const createSubject = expressAsyncHandler(async (req, res) => {
  const { grade_id, name, description } = req.body;
  if (!grade_id || !name || !description) {
    res.status(400);
    throw new Error("Fields are required!");
  }

  const availableName = await Subject.findOne({ name });
  if (availableName) {
    res.status(409);
    throw new Error("Subject already exists!");
  } else {
    const subject = await Subject.create({
      grade_id,
      name,
      description,
    });

    if (subject) {
      const subjects = await Subject.find();
      res.status(201).json(subjects);
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  }
});

export const updateSubject = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const editSubject = await Subject.findByIdAndUpdate(id, req.body);

  if (!editSubject) {
    res.status(404);
    throw new Error(`No subject found!`);
  } else {
    const subjects = await Subject.find();
    res.status(202).json(subjects);
  }
});
