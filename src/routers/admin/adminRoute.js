import express from "express";
import { login, register } from "../../controllers/admin/authController.js";

export const admin = express.Router();

admin.post("/login", login);
admin.post("/register", register);
