import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  availabe: { type: Boolean, required: true },
  price: { type: String, required: true },
  rating: { type: Number, required: false },
  imgLink: { type: String, required: true },
});
export const ItemModel = mongoose.model("Item", ItemSchema);
