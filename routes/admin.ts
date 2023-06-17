import { Router } from "express";
import { adminController } from "../controllers/admin";
import { adminProtection } from "../middleware/adminProtection";
import { getImgLink } from "../controllers/getImgController";
import multer from "multer";
import { createItem } from "../controllers/itemsController";
import { updateState } from "../controllers/ordersController";
export const adminRouter = Router();

adminRouter.post("/admin", adminProtection, adminController);

///uploading img and sending the link
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + " " + file.originalname);
  },
});
const upload = multer({ storage: storage });

adminRouter.post(
  "/getImgLink",
  adminProtection,
  upload.single("img"),
  getImgLink
);

adminRouter.post("/saveItem", adminProtection, createItem);

//TODO : get pending orders

adminRouter.patch("/order/updateState", adminProtection, updateState);
//TODO : get done orders for the month

//TODO : get the canceled orders for the month

//TODO : get all month orders
