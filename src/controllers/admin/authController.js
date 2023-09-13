import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../../models/adminModle.js";

export const register = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fileds are required!");
  }

  const avalableUsername = await Admin.findOne({ username });
  const avalableEmail = await Admin.findOne({ email });

  if (avalableEmail) {
    res.status(409);
    throw new Error("Email already in use!");
  } else if (avalableUsername) {
    res.status(409);
    throw new Error("Username already in use!");
  } else {
    const hashPassword = bcrypt.hashSync(password, 10);
    const admin = await Admin.create({
      username,
      email,
      password: hashPassword,
    });

    if (admin) {
      res.status(201).json({
        admin: {
          username: admin.username,
          email: admin.email,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fileds are required!");
  }

  const admin = await Admin.findOne({ username });
  if (admin && bcrypt.compareSync(password, admin.password)) {
    const userInfo = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;

    const accessToken = jwt.sign(userInfo, secret, { expiresIn: "24h" });

    admin.token = accessToken;
    res.status(201).json(admin);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
