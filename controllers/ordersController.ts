import { isValidObjectId } from "mongoose";
import { OrderModel } from "../models/order";
import asyncHandler from "express-async-handler";
import { Request } from "express";
import { HttpExpectation } from "../http expectations/HttpExpectations";
import { ItemModel } from "../models/item";
import { UserModel } from "../models/user";

export const createOrder = asyncHandler(async (req, res) => {
  const isValid = await validateBody(req);
  if (!isValid) {
    throw new HttpExpectation(
      res,
      "BAD_REQUEST",
      "non valid itemId or userId or orderState"
    );
  } else {
    const order = await OrderModel.create({
      item: req.body.itemId,
      user: req.body.userId,
      orderState: req.body.orderState,
    });
    res.send({ success: true, message: "order was created successfully" });
  }
});

export const userOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await OrderModel.find({
      user: req.params.userId,
    }).populate("item");
    const items = orders.map((order) => order.item);
    res.json({ success: true, data: items });
  } catch (error) {
    throw new Error(error.message);
  }
});

//validate the body for the newly created order
async function validateBody(req: Request) {
  const { body } = req;
  if (!["pending", "done", "canceled"].includes(body.orderState)) {
    return false;
  }

  if (!isValidObjectId(body.itemId) || !isValidObjectId(body.userId)) {
    return false;
  }
  try {
    const item = await ItemModel.findById(body.itemId);
    const user = await UserModel.findById(body.userId);
    if (item && user) {
      return true;
    } else {
      console.log(item, user);
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
