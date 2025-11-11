import mongoose from "mongoose";

// 🔹 MongoDB Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not defined in .env");

    const conn = await mongoose.connect(process.env.MONGO_URI, {

    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;