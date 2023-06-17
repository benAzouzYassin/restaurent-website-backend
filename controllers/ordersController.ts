import { isValidObjectId } from "mongoose";
import { OrderModel } from "../models/order";
import asyncHandler from "express-async-handler";
import { Request } from "express";
import { HttpExpectation } from "../http expectations/HttpExpectations";
import { ItemModel } from "../models/item";
import { UserModel } from "../models/user";

export const createOrder = asyncHandler(async (req, res) => {
  const { isValid, message: errorMsg } = await validateBody(req);
  if (!isValid) {
    throw new HttpExpectation(res, "BAD_REQUEST", errorMsg);
  } else {
    const order = await OrderModel.create({
      item: req.body.itemId,
      user: req["user"].id,
      orderState: req.body.orderState,
      countInCart: req.body.countInCart,
    });
    res.send({
      success: true,
      message: "order was created successfully",
      order: order,
    });
  }
});

//validate the body for the newly created order
async function validateBody(req: Request) {
  const { body } = req;
  if (!["pending", "done", "canceled"].includes(body.orderState)) {
    return {
      isValid: false,
      message: "orderState should be in ['pending', 'done', 'canceled'] ",
    };
  }
  if (
    isNaN(body.countInCart) ||
    body.countInCart < 1 ||
    body.countInCart > 100
  ) {
    return {
      isValid: false,
      message: "countInCart should be a number between 1 and 100 ",
    };
  }
  if (!isValidObjectId(body.itemId)) {
    return {
      isValid: false,
      message: "itemId and userId should be valid",
    };
  }
  try {
    const item = await ItemModel.findById(body.itemId);
    const user = await UserModel.findById(req["user"].id);
    if (item && user) {
      return { isValid: true, message: "" };
    } else {
      return {
        isValid: false,
        message: "item or user does not exist",
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

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

export const updateCount = asyncHandler(async (req, res) => {
  const { body } = req;
  console.log("this the body ", req.body);
  if (!body.orderId || !isValidObjectId(body.orderId)) {
    throw new HttpExpectation(res, "BAD_REQUEST", "non valid orderId");
  }

  if (isNaN(body.newCount) || body.newCount < 0 || body.newCount > 100) {
    throw new HttpExpectation(res, "BAD_REQUEST", "non valid newCount");
  }

  try {
    const updated = await OrderModel.findByIdAndUpdate(body.orderId, {
      countInCart: body.newCount,
    });
    res.send({ success: true, message: "updated succesfully", p: updated });
  } catch (error) {
    throw new HttpExpectation(res, "INTERNAL_SERVER_ERROR", error.message);
  }
});

export const updateState = asyncHandler(async (req, res) => {
  const { body } = req;
  // console.log("this the body ", req.body);
  if (!body.orderId || !isValidObjectId(body.orderId)) {
    throw new HttpExpectation(res, "BAD_REQUEST", "non valid orderId");
  }
  const validation =
    ["pending", "canceled", "done"].indexOf(body.newState) === -1
      ? false
      : true;
  if (!validation) {
    throw new HttpExpectation(
      res,
      "BAD_REQUEST",
      "newState should be one of this [pending,canceled,done]"
    );
  }

  try {
    const updated = await OrderModel.findByIdAndUpdate(body.orderId, {
      orderState: body.newState,
    });
    res.send({ success: true, message: "updated succesfully", p: updated });
  } catch (error) {
    throw new HttpExpectation(res, "INTERNAL_SERVER_ERROR", error.message);
  }
});
