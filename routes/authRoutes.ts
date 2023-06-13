import { Router } from "express";
import { login } from "../controllers/loginUser";
import { register } from "../controllers/registerUser";
import { UserModel } from "../models/user";
export const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", register);
/**
 * @swagger
 * tags:
 *   name: authentication
 *   description: The authentication routes
 * /login:
 *   post:
 *     summary: login a user
 *
 *     requestBody:
 *       required: true
 *       content:
 *         name:
 *           schema:
 *              name: string
 *         password:
 *           schema:
 *              password: string
 *         phone:
 *           schema:
 *              phone: string
 *
 *     responses:
 *       201:
 *         description: user was created.
 *         content:
 *

 *       400:
 *         description: bad body request either name or password not found
 *
 * /register:
 *   post:
 *     summary: register a user
 *
 *     requestBody:
 *       required: true
 *       content:
 *         name:
 *           schema:
 *              name: string
 *         password:
 *           schema:
 *              password: string
 *     responses:
 *       200:
 *         description: logged in.
 *         content:
 *
 *       401:
 *         description: wrong password or name
 *       400:
 *         description: bad body request either name or password not found
 *
 *       500:
 *         description: server error
 *
 */
