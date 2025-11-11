import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import userRoutes from "./routes/userRoutes.js";
import adminRoute from "./routes/adminRoute.js";
import connectDB from "./config/db.js";
import metaRoute from "./routes/metaRoute.js";
dotenv.config();
const app = express();
app.use(express.json());

// Define allowed origins
const allowedOrigins = ["http://localhost:5173"];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman, curl
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || "your_secret_key_here",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minutes
}));

// Rate limiter for users
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, 
  message: { success: false, message: "Too many requests from this IP. Try later." }
});
app.use("/api/users", limiter);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoute);
// Route for Facebook CAPI
app.use("/api/meta", metaRoute);
// Root
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect DB & start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
