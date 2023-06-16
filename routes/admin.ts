import { Router } from "express";
import { adminController } from "../controllers/admin";
import { adminProtection } from "../middleware/adminProtection";
import { addItem } from "../controllers/getImgController";
import multer from "multer";
export const adminRouter = Router();

adminRouter.post("/admin", adminProtection, adminController);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + " " + file.originalname);
  },
});

const upload = multer({ storage: storage });

adminRouter.post("/addItem", upload.single("img"), addItem);

//TODO : get pending orders

//TODO : update order state

//TODO : get done orders for the month

//TODO : get the canceled orders for the month

//TODO : get all month orders
