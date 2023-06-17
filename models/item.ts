import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  itemName: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: false },
  imgLink: { type: String, required: true },
  ingredients: { type: Array, required: true },
});
export const ItemModel = mongoose.model("Item", ItemSchema);
