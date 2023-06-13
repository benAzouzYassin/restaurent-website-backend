import { Request, Response } from "express";
import { HttpExpectation } from "../http expectations/HttpExpectations";
import handleAsync from "express-async-handler";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/user";
import { generateToken } from "../utilities";

async function saveUser(password: string, userName: string, phone: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  const user = await UserModel.create({
    name: userName,
    password: hashedPass,
    phone: phone,
  });
  const payload = { name: user.name, isAdmin: user.isAdmin, id: user.id };
  const token = generateToken(payload);
  return token;
}

export const register = handleAsync(async (req: Request, res: Response) => {
  if (req.body && req.body.name && req.body.password && req.body.phone) {
    const { name, password, phone } = req.body;

    try {
      const user = await UserModel.findOne({ name: name });
      if (user) {
        throw new HttpExpectation(res, "BAD_REQUEST", "user exists");
      }

      const token = await saveUser(password, name, phone);
      res.status(201).json({ success: true, token: token });
    } catch (error) {
      throw new HttpExpectation(res, "INTERNAL_SERVER_ERROR");
    }
  } else {
    throw new HttpExpectation(res, "BAD_REQUEST");
  }
});
