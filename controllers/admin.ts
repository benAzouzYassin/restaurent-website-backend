import asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order";
import { HttpExpectation } from "../http expectations/HttpExpectations";

export const getPending = asyncHandler(async (req, res) => {
  try {
    const pending = await OrderModel.find({ orderState: "pending" }).populate([
      "item",
      "user",
    ]);
    res.send(pending);
  } catch (error) {
    throw new HttpExpectation(res, "NOT_FOUND", error.message);
  }
});

export const cancelOrder = asyncHandler(async (req, res) => {
  if (!req.body.orderId) {
    throw new HttpExpectation(res, "BAD_REQUEST", "no order id was provided");
  }
  try {
    const updated = await OrderModel.findByIdAndUpdate(req.body.orderId, {
      orderState: "canceled",
    });
    res.status(204).json({ message: "canceled successfully", order: updated });
  } catch (error) {
    throw new HttpExpectation(res, "INTERNAL_SERVER_ERROR", error.message);
  }
});

export const confirmOrder = asyncHandler(async (req, res) => {
  if (!req.body.orderId) {
    throw new HttpExpectation(res, "BAD_REQUEST", "no order id was provided");
  }
  try {
    const updated = await OrderModel.findByIdAndUpdate(req.body.orderId, {
      orderState: "done",
    });
    res.status(204).json({ message: "confirmed successfully", order: updated });
  } catch (error) {
    throw new HttpExpectation(res, "INTERNAL_SERVER_ERROR", error.message);
  }
});

export const getDoneOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await OrderModel.find({ orderState: "done" }).populate([
      "user",
      "item",
    ]);
    res.send(orders);
  } catch (error) {
    throw new HttpExpectation(res, "NOT_FOUND", error.message);
  }
});

export const getCanceledOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await OrderModel.find({ orderState: "canceled" }).populate([
      "user",
      "item",
    ]);
    res.send(orders);
  } catch (error) {
    throw new HttpExpectation(res, "NOT_FOUND", error.message);
  }
});
