import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const adminController = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("hello admin");
  }
);
