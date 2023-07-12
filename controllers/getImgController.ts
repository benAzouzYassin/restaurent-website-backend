import { Response, Request } from "express";
import { HttpExpectation } from "../http expectations/HttpExpectations";
import asyncHandler from "express-async-handler";
import fs from "fs";

export const getImgLink = asyncHandler(async (req: Request, res: Response) => {
  if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpeg") {
    fs.rm(req.file.path, (err) => {
      console.error(err);
    });
    throw new HttpExpectation(res, "BAD_REQUEST", "wrong type of the img");
  }
  res.send(req.get("host") + "/" + req.file.path);
});
