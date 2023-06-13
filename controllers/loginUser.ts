import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcryptjs";
import { HttpExpectation } from "../http expectations/HttpExpectations";
import { generateToken } from "../utilities";
import asyncHandler from "express-async-handler";
//TODO : clean and refactor the code

interface UserData {
  userName: string;
  isAdmin: boolean;
}

interface ApiResponse {
  token?: string;
  success: boolean;
  data?: UserData;
}

export const login = asyncHandler(async (req: Request, res: Response) => {
  if (req.body && req.body.name && req.body.password) {
    try {
      const users = await UserModel.find({ name: req.body.name });

      if (users) {
        let results: ApiResponse;
        for (let i = 0; i < users.length; i++) {
          const compare = await bcrypt.compare(
            req.body.password,
            users[i].password
          );
          if (compare) {
            const token = generateToken({
              name: req.body.name,
              isAdmin: users[i].isAdmin,
              id: users[i].id,
            });
            results = {
              success: true,
              token: token,
              data: { userName: req.body.name, isAdmin: users[i].isAdmin },
            };
            break;
          }
        }
        if (results) {
          res.send(results);
        } else {
          throw new HttpExpectation(res, "UNAUTHORIZED");
        }
      } else {
        console.log("unotherized");
        throw new HttpExpectation(res, "UNAUTHORIZED");
      }
    } catch (err) {}
  } else {
    console.log("bad req");
    throw new HttpExpectation(res, "BAD_REQUEST");
  }
});
