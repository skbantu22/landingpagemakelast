import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import MongoStore from "connect-mongo";

import userRoutes from "./routes/userRoutes.js";
import adminRoute from "./routes/adminRoute.js";
import metaRoute from "./routes/metaRoute.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

// ----------------- CORS -----------------
const allowedOrigins = [
   "http://localhost:5173",
  process.env.FRONTEND_URL || "http://localhost:5174",
  `https://www.${process.env.FRONTEND_URL || "primehealthcare202.cloud"}`
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman/curl
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ----------------- Trust Proxy -----------------
app.set('trust proxy', 1);

// ----------------- Session -----------------
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecretkey",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { 
    maxAge: 30 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true
  }
}));

// ----------------- Rate Limiter -----------------
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 10,             // adjust for production
  message: { success: false, message: "Too many requests. Try later." }
});
app.use("/api/users", limiter);

// ----------------- Routes -----------------
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/meta", metaRoute);

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ----------------- DB & Server -----------------
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
