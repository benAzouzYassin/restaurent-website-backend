import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import { dbConnect } from "./config/db";
import { authRouter } from "./routes/authRoutes";
import bodyParser from "body-parser";
import { adminRouter } from "./routes/admin";
import { itemsRouter } from "./routes/itemsRoutes";

import { orderRouter } from "./routes/ordersRoutes";
import { userRouter } from "./routes/user";

const app = express();
const port = 3000;

//configs
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
dbConnect();

app.get("/", async (req, res) => {
  res.send("<h1>welcome ! </h1>");
});

//routes
app.use("/", authRouter);
app.use("/", itemsRouter);
app.use("/", adminRouter);
app.use("/", orderRouter);
app.use("/", userRouter);
//
app.use(errorHandler);

//adding documentations

app.listen(port);
console.log(`app is live on port ${port}`);
export default app;
