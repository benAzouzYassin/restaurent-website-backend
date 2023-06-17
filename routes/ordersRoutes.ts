import { Router } from "express";

import {
  createOrder,
  updateCount,
  updateState,
  userOrders,
} from "../controllers/ordersController";
import { protect } from "../middleware/routeProtection";

export const orderRouter = Router();
//TODO : should send a message to the email and a notification
orderRouter.post("/order/create", protect, createOrder);

orderRouter.get("/userOrders/:userId", userOrders);

orderRouter.patch("/order/updateCount", protect, updateCount);

orderRouter.patch("/order/updateState", protect, updateState);

//TODO : delete an order

//TODO : work on the client side of the project
