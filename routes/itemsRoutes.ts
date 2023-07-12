import { Router } from "express";
import {
  createItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
} from "../controllers/itemsController";
import { adminProtection } from "../middleware/adminProtection";

export const itemsRouter = Router();

itemsRouter.get("/items", getAll);

itemsRouter.get("/getItem/:name", getItem);

itemsRouter.post("/createItem", adminProtection, createItem);

itemsRouter.put("/updateItem/:id", adminProtection, updateItem);

itemsRouter.delete("/deleteItem/:id", adminProtection, deleteItem);
