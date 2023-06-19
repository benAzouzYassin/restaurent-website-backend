import { Router } from "express";
import {
  cancelOrder,
  confirmOrder,
  getCanceledOrders,
  getDoneOrders,
  getPending,
} from "../controllers/admin";
import { adminProtection } from "../middleware/adminProtection";
import { getImgLink } from "../controllers/getImgController";
import multer from "multer";
import { createItem } from "../controllers/itemsController";
import { updateState } from "../controllers/ordersController";
export const adminRouter = Router();

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

adminRouter.patch("/order/updateState", adminProtection, updateState);
adminRouter.get("/pendingOrders", adminProtection, getPending);
adminRouter.patch("/cancelOrder", adminProtection, cancelOrder);
adminRouter.patch("/confirmOrder", adminProtection, confirmOrder);
adminRouter.get("/doneOrders", adminProtection, getDoneOrders);
adminRouter.get("/canceledOrders", adminProtection, getCanceledOrders);
