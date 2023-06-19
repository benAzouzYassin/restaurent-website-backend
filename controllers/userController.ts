import { Request, Response } from "express";
import { HttpExpectation } from "../http expectations/HttpExpectations";
import jwt from "jsonwebtoken";
export const isLoggedIn = (req: Request, res: Response) => {
  if (!req.body.token) {
    throw new HttpExpectation(
      res,
      "BAD_REQUEST",
      "no token was sent in the body"
    );
  }
  try {
    jwt.verify(req.body.token, process.env.JWT_SECRET);
    res.send(true);
  } catch (error) {
    res.send(false);
  }
};
