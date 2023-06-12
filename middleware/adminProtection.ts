import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpExpectation } from "../http expectations/HttpExpectations";

export function adminProtection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new HttpExpectation(res, "UNAUTHORIZED");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload["isAdmin"]) {
      throw new HttpExpectation(res, "UNAUTHORIZED");
    }
    req["user"] = payload;
    next();
  } catch (error) {
    throw new HttpExpectation(res, "UNAUTHORIZED");
  }
}
