//db config
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (err) {
    console.log("db connection failed", err);
  }
}
