import express from "express";
import { isLoggedIn } from "../controllers/userController";

export const userRouter = express.Router();
userRouter.post("/isLoggedIn", isLoggedIn);
