import { Router } from "express";
import { login } from "../controllers/loginUser";
import { register } from "../controllers/registerUser";
import { UserModel } from "../models/user";
export const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", register);
