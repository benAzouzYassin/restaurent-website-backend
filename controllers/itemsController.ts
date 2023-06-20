import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HttpExpectation } from "../http expectations/HttpExpectations";
import { ItemModel } from "../models/item";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.find({}, "-__v");
    res.json(items);
  } catch (error) {
    console.log(error.message, "itemsController.ts line 11 ");
    throw new HttpExpectation(res, "INTERNAL_SERVER_ERROR");
  }
});

export const getItem = asyncHandler(async (req: Request, res: Response) => {
  try {
    const item = await ItemModel.findOne({ itemName: req.params.name }, "-__v");
    if (item) {
      res.json(item);
    } else {
      throw new HttpExpectation(res, "NOT_FOUND", "item was not found");
    }
  } catch (error) {
    console.log(error.message, "itemsController.ts line 11 ");
    throw new HttpExpectation(res, "INTERNAL_SERVER_ERROR");
  }
});

export const createItem = asyncHandler(async (req: Request, res: Response) => {
  validateBody(req, res);

  const { isAvailable, price, rating, imgLink, itemName } = req.body;
  try {
    const imgUrl =
      "http://" +
      req.body.imgLink
        .split("")
        .map((char: string) => {
          if (char === "\\") {
            return "/";
          } else if (char == " ") {
            return "%20";
          } else {
            return char;
          }
        })
        .join("");

    const newItem = await ItemModel.create({
      ...req.body,
      imgLink: imgUrl,
      ingredients: req.body.ingredients.split("-"),
    });
    res.status(201).send(newItem);
  } catch (error) {
    console.error(error.message);
    throw new HttpExpectation(res, "INTERNAL_SERVER_ERROR");
  }
});

export const updateItem = asyncHandler(async (req: Request, res: Response) => {
  validateBody(req, res);
  const updates = {
    ...req.body,
  };
  try {
    const item = await ItemModel.findByIdAndUpdate(req.params.id, updates);
    if (!item) {
      throw new HttpExpectation(res, "NOT_FOUND");
    }
    res.json({ success: true, message: "item was updated successfully" });
  } catch (error) {
    throw new Error();
  }
});

export const deleteItem = asyncHandler(async (req: Request, res: Response) => {
  try {
    const item = await ItemModel.findByIdAndDelete(req.params.id);
    if (!item) {
      throw new HttpExpectation(res, "NOT_FOUND");
    }
    res.json({ success: true, message: "item was deleted successfully" });
  } catch (error) {
    throw new Error();
  }
  res.send(`deleting item with id  ${req.params.id}`);
});

//verify if the body have item data or not
function validateBody(req: Request, res: Response) {
  const { body } = req;
  //verify existence
  if (
    !body ||
    !body.ingredients ||
    !body.itemName ||
    !body.price ||
    !body.rating ||
    !body.imgLink
  ) {
    throw new HttpExpectation(
      res,
      "BAD_REQUEST",
      "the body should contain {itemName:string, ingredients: string[], price:number(decimal), rating:number, imgLink:string}"
    );
  }

  // verify types
  if (body.isAvailable != "true" && body.isAvailable != "false") {
    throw new HttpExpectation(
      res,
      "BAD_REQUEST",
      "isAvailable should be a boolean "
    );
  }
  if (isNaN(body.price)) {
    throw new HttpExpectation(
      res,
      "BAD_REQUEST",
      "price should be a decimal number"
    );
  } else {
    if (body.price < 0 || body.price > 1000) {
      throw new HttpExpectation(
        res,
        "BAD_REQUEST",
        "price should be between 0 and 1000"
      );
    }
  }
  if (isNaN(body.rating)) {
    throw new HttpExpectation(res, "BAD_REQUEST", "rating should be a number");
  } else if (body.rating > 5 || body.rating < 0) {
    throw new HttpExpectation(
      res,
      "BAD_REQUEST",
      "rating should be between 0 and 5"
    );
  }
}
