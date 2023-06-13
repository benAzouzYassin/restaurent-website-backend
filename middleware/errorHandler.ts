import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(err.message);
    res.status(500).json({
      code: res.statusCode,
      message: err.message,
      errStack: process.env.NODE_ENV == "dev" ? err.stack : null,
    });
  } catch (error) {
    console.error(error.message);
  }
  next();
}
