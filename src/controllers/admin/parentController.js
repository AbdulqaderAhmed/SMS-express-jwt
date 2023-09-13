import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Parent } from "../../models/parentModel.js";

export const register = expressAsyncHandler(async (req, res) => {
  const { firstName, middleName, lastName, username, password, phone, DOB } =
    req.body;
  if (
    !firstName ||
    !middleName ||
    !lastName ||
    !username ||
    !phone ||
    !DOB ||
    !password
  ) {
    res.status(400);
    throw new Error("All fileds are required!");
  }

  const avalableUsername = await Parent.findOne({ username });
  const avalablePhone = await Parent.findOne({ phone });

  if (avalableUsername) {
    res.status(409);
    throw new Error("Email already in use!");
  } else if (avalablePhone) {
    res.status(409);
    throw new Error("Phone number already in use!");
  } else {
    const hashPassword = bcrypt.hashSync(password, 10);
    const parent = await Parent.create({
      firstName,
      middleName,
      lastName,
      password: hashPassword,
      username,
      phone,
      DOB,
    });

    if (parent) {
      res.status(201).json({
        parent: {
          parent_id: parent.id,
          firstName: parent.firstName,
          middleName: parent.middleName,
          lastName: parent.lastName,
          username: parent.username,
          phone: parent.phone,
          DOB: parent.DOB,
          status: parent.status,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid student data!");
    }
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fileds are required!");
  }

  const parent = await Parent.findOne({ email });
  if (parent && bcrypt.compareSync(password, parent.password)) {
    const userInfo = {
      id: parent.id,
      email: parent.email,
      firstName: parent.firstName,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign(userInfo, secret, { expiresIn: "24h" });

    parent.token = accessToken;

    res.status(201).json(parent);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const updateParent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const editParent = await Parent.findByIdAndUpdate(id, req.body);

  if (!editStudent) {
    res.status(404);
    throw new Error("Student not found!");
  } else {
    res.status(202).json(editParent);
  }
});
