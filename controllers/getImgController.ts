import { Response, Request } from "express";
import { HttpExpectation } from "../http expectations/HttpExpectations";
import asyncHandler from "express-async-handler";
import fs from "fs";
import { ItemModel } from "../models/item";

export const getImgLink = asyncHandler(async (req: Request, res: Response) => {
  if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpeg") {
    fs.rm(req.file.path, (err) => {
      console.error(err);
    });
    throw new HttpExpectation(res, "BAD_REQUEST", "wrong type of the img");
  }
  res.send(req.get("host") + "/" + req.file.path);
});

// export const saveItem = asyncHandler(async (req: Request, res: Response) => {
//   if (
//     !req.body ||
//     !req.body.itemName ||
//     !req.body.isAvailable ||
//     !req.body.price ||
//     !req.body.rating ||
//     !req.body.imgLink ||
//     !req.body.ingredients
//   ) {
//      const imgUrl =
//        "http://" +
//        req.body.imgLink
//          .split("")
//          .map((char: string) => {
//            if (char === "\\") {
//              return "/";
//            } else if (char == " ") {
//              return "%20";
//            } else {
//              return char;
//            }
//          })
//          .join("");
//     console.log(req.body);
//     throw new HttpExpectation(res, "BAD_REQUEST", "missing fields ");
//   }
//   const newItem = await ItemModel.create({
//     ...req.body,
//     ingredients: req.body.ingredients.split("-"),
//   });
//   res.send(newItem);
// });
