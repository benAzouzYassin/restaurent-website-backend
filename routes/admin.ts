import { Router } from "express";
import { adminController } from "../controllers/admin";
import { adminProtection } from "../middleware/adminProtection";
export const adminRouter = Router();
adminRouter.post("/admin", adminProtection, adminController);
