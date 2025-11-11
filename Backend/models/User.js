import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, required:true }, // phone number
  address: { type: String },
  order: { // latest order (optional)
  orderNumber: Number,
  quantity: Number,
  total: Number,
  paymentMethod: { type: String, default: "cod" },
  isComplete: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
},
orders: [ // history
  {
    orderNumber: Number,
    quantity: Number,
    total: Number,
    paymentMethod: { type: String, default: "cod" },
    isComplete: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
  }
],
  deliveryStatus: {
    type: String,
    enum: ["Pending", "Delivered", "Cancelled"], // allowed values
    default: "Pending", // default status
  },
});

const User = mongoose.model("User", userSchema);

export default User;
