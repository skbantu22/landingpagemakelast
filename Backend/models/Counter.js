import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // "orderNumber"
  seq: { type: Number, default: 1000 }, // start from 1000
});

export default mongoose.model("Counter", counterSchema);
