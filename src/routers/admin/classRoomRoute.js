import express from "express";
import { tokenValidation } from "../../middlewares/tokenValidation.js";
import {
  createClass,
  updateClass,
} from "../../controllers/admin/classRoomController.js";

export const classRoom = express.Router();

classRoom.use(tokenValidation);

classRoom.post("/create", createClass);
classRoom.put("/:id", updateClass);
