import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Student } from "../../models/studentModel.js";
import { json } from "express";

export const getAllStudent = expressAsyncHandler(async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

export const register = expressAsyncHandler(async (req, res) => {
  const {
    parent_id,
    firstName,
    middleName,
    lastName,
    email,
    password,
    gender,
    age,
    phone,
    DOB,
    DOJ,
  } = req.body;
  if (
    !parent_id ||
    !firstName ||
    !middleName ||
    !lastName ||
    !email ||
    !gender ||
    !age ||
    !phone ||
    !DOB ||
    !DOJ ||
    !password
  ) {
    res.status(400);
    throw new Error("All fileds are required!");
  }

  const avalableEmail = await Student.findOne({ email });
  const avalablePhone = await Student.findOne({ phone });

  if (avalableEmail) {
    res.status(409);
    throw new Error("Email already in use!");
  } else if (avalablePhone) {
    res.status(409);
    throw new Error("Phone number already in use!");
  } else {
    const hashPassword = bcrypt.hashSync(password, 10);
    const student = await Student.create({
      parent_id,
      firstName,
      middleName,
      lastName,
      password: hashPassword,
      email,
      gender,
      age,
      phone,
      DOB,
      DOJ,
    });

    if (student) {
      res.status(201).json({
        student: {
          parent_id: student.id,
          firstName: student.firstName,
          middleName: Student.middleName,
          lastName: student.lastName,
          email: student.email,
          gender: student.gender,
          age: student.age,
          phone: student.phone,
          DOB: student.DOB,
          DOJ: student.DOJ,
          status: student.status,
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

  const student = await Student.findOne({ email });
  if (student && bcrypt.compareSync(password, student.password)) {
    const userInfo = {
      id: student.id,
      email: student.email,
      firstName: student.firstName,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign(userInfo, secret, { expiresIn: "24h" });

    student.token = accessToken;

    res.status(201).json(student);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const updateStudent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const editStudent = await Student.findByIdAndUpdate(id, req.body);

  if (!editStudent) {
    res.status(404);
    throw new Error("Student not found!");
  } else {
    res.status(202).json(editStudent);
  }
});
