import expressAsyncHandler from "express-async-handler";
import { ClassRoom } from "../../models/classRoomModel.js";

export const getAllClass = expressAsyncHandler(async (req, res) => {
  const classes = await ClassRoom.find();
  res.json(classes);
});

export const createClass = expressAsyncHandler(async (req, res) => {
  const { year, section, remark, grade_id, teacher_id } = req.body;
  if (!year || !section || !remark || !grade_id || !teacher_id) {
    res.status(400);
    throw new Error("All fields required!");
  }

  const avalableSection = await ClassRoom.findOne({ section });
  const availableTeacher = await ClassRoom.findOne({ teacher_id });
  if (avalableSection) {
    res.status(409);
    throw new Error("This Section is available!");
  } else if (availableTeacher) {
    res.status(400);
    throw new Error("This Teacher has a class!");
  } else {
    const classRoom = await ClassRoom.create({
      grade_id,
      teacher_id,
      year,
      section,
      remark,
    });

    if (classRoom) {
      res.status(201).json({
        classRoom: {
          grade_id: classRoom.grade_id,
          teacher_id: classRoom.grade_id,
          year: classRoom.year,
          section: classRoom.section,
          remark: classRoom.remark,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid data!");
    }
  }
});

export const updateClass = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const editClass = await ClassRoom.findByIdAndUpdate(id, req.body);

  if (!editClass) {
    res.status(404);
    throw new Error("Class room is not found!");
  } else {
    // const { teacher_id } = editClass;
    // const availableTeacher = await ClassRoom.findOne({ teacher_id });
    // if (availableTeacher) {
    //   res.status(409);
    //   throw new Error("This teacher already assigend to a class!");
    // }
    const classes = await ClassRoom.find();
    res.status(202).json(classes);
  }
});
