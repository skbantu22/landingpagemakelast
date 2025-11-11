import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

export default router;
