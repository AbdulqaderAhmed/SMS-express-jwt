import express from "express";
import {
  register,
  updateParent,
} from "../../controllers/admin/parentController.js";
import { tokenValidation } from "../../middlewares/tokenValidation.js";

export const parent = express.Router();

parent.use(tokenValidation);

parent.post("/register", register);
parent.put("/:id", updateParent);
