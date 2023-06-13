import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderState: { type: String, required: true },
  },
  { timestamps: true }
);
export const OrderModel = mongoose.model("Order", OrderSchema);
