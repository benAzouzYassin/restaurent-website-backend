import { Router } from "express";
import { getAll } from "../controllers/items";
export const itemsRouter = Router();

itemsRouter.get("/allItems", getAll);
