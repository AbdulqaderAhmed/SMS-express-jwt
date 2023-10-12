import express from "express";
import {
  register,
  updateParent,
  Allparent
} from "../../controllers/admin/parentController.js";
import { tokenValidation } from "../../middlewares/tokenValidation.js";

export const parent = express.Router();

parent.use(tokenValidation);

parent.get('/parent', Allparent)
parent.post("/create", register);
parent.put("/:id", updateParent);
