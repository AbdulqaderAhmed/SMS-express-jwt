import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  createClass,
  getAllClass,
  updateClass,
} from "../../controllers/admin/classRoomController.js";

export const classRoom = express.Router();

classRoom.use(tokenValidation);

classRoom.get("/", getAllClass);
classRoom.post("/create", createClass);
classRoom.put("/:id", updateClass);
