import { Response, Request } from "express";
import { HttpExpectation } from "../http expectations/HttpExpectations";
import asyncHandler from "express-async-handler";
import fs from "fs";
import { ItemModel } from "../models/item";
export const addItem = asyncHandler(async (req: Request, res: Response) => {
  if (
    !req.body ||
    !req.body.itemName ||
    !req.body.isAvailable ||
    !req.body.price ||
    !req.body.rating
  ) {
    fs.rm(req.file.path, (err) => {
      console.error(err);
    });
    throw new HttpExpectation(res, "BAD_REQUEST");
  } else {
    const newItem = await ItemModel.create({
      imgLink: req.file.path,
      ...req.body,
    });
    res.send(newItem);
    //res.json({ file: req.file, otherData: req.body });
  }
});
