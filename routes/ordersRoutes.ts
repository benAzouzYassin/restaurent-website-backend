import { Router } from "express";

import {
  createOrder,
  updateCount,
  userOrders,
} from "../controllers/ordersController";
import { protect } from "../middleware/routeProtection";

export const orderRouter = Router();
//TODO : should send a message to the email and a notification
orderRouter.post("/order/create", protect, createOrder);

orderRouter.get("/userOrders/:userId", userOrders);

//TODO :update an order count
orderRouter.put("/order/updateCount", protect, updateCount);

//TODO : delete an order
