import express from "express";
import { getUsers, createUser, updateUserStatus } from "../controllers/userController.js";

const router = express.Router();

// Middleware to block multiple submissions per session
const blockMultipleSubmissions = (req, res, next) => {
  if (req.session.hasSubmitted) {
    return res.status(429).json({ message: "You have already submitted the form recently." });
  }
  req.session.hasSubmitted = true; // mark session as used
  next();
};

// GET all users
router.get("/", getUsers);

// POST user with session protection
router.post("/", blockMultipleSubmissions, createUser);

// PUT to update delivery status
router.put("/:id", updateUserStatus);

export default router;
