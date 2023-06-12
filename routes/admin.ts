import { Router } from "express";
import { adminController } from "../controllers/admin";
export const adminRouter = Router();
adminRouter.post("/admin", adminController);
