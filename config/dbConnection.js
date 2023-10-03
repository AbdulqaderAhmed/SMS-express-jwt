import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

export const dbConnectionOne = expressAsyncHandler(async () => {
  const connect = await mongoose.connect(process.env.DATABASE_CONNECTION_ONE);
  if (!connect) {
    console.log("Error connecting to database");
  } else {
    console.log(
      `Database connection established at host: ${connect.connection.host} and name: ${connect.connection.name}`
    );
  }
});

export const dbConnectionTwo = expressAsyncHandler(async () => {
  const connect = await mongoose.connect(process.env.DATABASE_CONNECTION_TWO);
  if (!connect) {
    console.log("Error connecting to database");
  } else {
    console.log(
      `Database connection established at host: ${connect.connection.host} and name: ${connect.connection.name}`
    );
  }
});
