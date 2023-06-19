import { Router } from "express";

import {
  createOrder,
  updateState,
  userOrders,
} from "../controllers/ordersController";
import { protect } from "../middleware/routeProtection";

export const orderRouter = Router();
//TODO : should send a message to the email and a notification
orderRouter.post("/order/create", protect, createOrder);

orderRouter.patch("/order/updateState", protect, updateState);

orderRouter.get("/userOrders", protect, userOrders);
