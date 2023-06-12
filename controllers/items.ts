import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  res.send("getting all elements");
});
