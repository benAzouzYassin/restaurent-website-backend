import { Router } from "express";

import { adminProtection } from "../middleware/adminProtection";
import { createOrder, userOrders } from "../controllers/ordersController";

export const orderRouter = Router();
orderRouter.post("/createOrder", adminProtection, createOrder);
orderRouter.get("/userOrders/:userId", userOrders);
