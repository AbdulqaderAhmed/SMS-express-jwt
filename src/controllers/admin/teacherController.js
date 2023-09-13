import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Teacher } from "../../models/teacherModel.js";

export const register = expressAsyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    username,
    password,
    gender,
    age,
    phone,
    DOB,
    DOJ,
  } = req.body;
  if (
    !firstName ||
    !middleName ||
    !lastName ||
    !username ||
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

  const avalableUsername = await Teacher.findOne({ username });
  const avalablePhone = await Teacher.findOne({ phone });

  if (avalableUsername) {
    res.status(409);
    throw new Error("Username already in use!");
  } else if (avalablePhone) {
    res.status(409);
    throw new Error("Phone number already in use!");
  } else {
    const hashPassword = bcrypt.hashSync(password, 10);
    const teacher = await Teacher.create({
      firstName,
      middleName,
      lastName,
      username,
      password: hashPassword,
      gender,
      age,
      phone,
      DOB,
      DOJ,
    });

    if (teacher) {
      res.status(201).json({
        teacher: {
          firstName: teacher.firstName,
          middleName: teacher.middleName,
          lastName: teacher.lastName,
          username: teacher.username,
          gender: teacher.gender,
          age: teacher.age,
          phone: teacher.phone,
          DOB: teacher.DOB,
          DOJ: teacher.DOJ,
          status: teacher.status,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid teacher data!");
    }
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fileds are required!");
  }

  const teacher = await Teacher.findOne({ email });
  if (teacher && bcrypt.compareSync(password, teacher.password)) {
    const userInfo = {
      id: teacher.id,
      email: teacher.email,
      firstName: teacher.firstName,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign(userInfo, secret, { expiresIn: "24h" });

    teacher.token = accessToken;

    res.status(201).json(teacher);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const updateTeacher = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const editTeacher = await Teacher.findByIdAndUpdate(id, req.body);

  if (!editTeacher) {
    res.status(404);
    throw new Error("Teacher not found!");
  } else {
    res.status(202).json(editTeacher);
  }
});
