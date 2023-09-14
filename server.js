import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConnection } from "./config/dbConnection.js";
import { admin } from "./src/routers/admin/adminRoute.js";
import { student } from "./src/routers/admin/studentRoute.js";
import { parent } from "./src/routers/admin/parentRoute.js";
import { teacher } from "./src/routers/admin/teacherRoute.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { grade } from "./src/routers/admin/gradeRoute.js";
import { classRoomStudent } from "./src/routers/admin/classRoomStudentRoute.js";
import { classRoom } from "./src/routers/admin/classRoomRoute.js";
import { subject } from "./src/routers/admin/subjectRoute.js";
import { attendance } from "./src/routers/admin/attendanceRoute.js";
import { examType } from "./src/routers/admin/examTypeRoute.js";
import { exam } from "./src/routers/admin/examRoute.js";

dbConnection();

const PORT = process.env.SERVER_PORT;
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// admin creating users route
app.use("/api/admin/auth", admin);
app.use("/api/admin/student", student);
app.use("/api/admin/parent", parent);
app.use("/api/admin/teacher", teacher);
app.use("/api/admin/grade", grade);
app.use("/api/admin/studentClass", classRoomStudent);
app.use("/api/admin/classRoom", classRoom);
app.use("/api/admin/subject", subject);
app.use("/api/admin/attendance", attendance);
app.use("/api/admin/examType", examType);
app.use("/api/admin/exam", exam);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application started on http://localhost:${PORT}`);
});
