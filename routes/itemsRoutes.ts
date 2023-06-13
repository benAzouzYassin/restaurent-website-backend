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

//@Get /allItems
itemsRouter.get("/items", getAll);

//@Get /getItem/:name
itemsRouter.get("/getItem/:name", getItem);

//@Post /createItem
//@content : isAvailable:bool / price:string / rating:number [1-5] / imglink:string / itemName
itemsRouter.post("/createItem", adminProtection, createItem);

//@put /updateItem/:id
//@content : newIsAvailable?:bool / newPrice?:string / newRating?:number [1-5] / newImglink?:string / itemName
itemsRouter.put("/updateItem/:id", adminProtection, updateItem);

//@Delete /deleteItem/:id
itemsRouter.delete("/deleteItem/:id", adminProtection, deleteItem);
