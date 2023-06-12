import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import { dbConnect } from "./config/db";
import { authRouter } from "./routes/authRoutes";
import bodyparser from "body-parser";
import { adminProtection } from "./middleware/adminProtection";
import { adminRouter } from "./routes/admin";
import { itemsRouter } from "./routes/itemsRoutes";
const app = express();
const port = 5500;
app.use(bodyparser.json());
app.use(cors());

dbConnect();

app.get("/", async (req, res) => {
  res.send("<h1>welcome ! </h1>");
});

//routes
app.use("/", authRouter);
app.use("/", itemsRouter);
app.use("/", adminProtection, adminRouter);
//
app.use(errorHandler);
app.listen(port);
console.log(`app is live on port ${port}`);
