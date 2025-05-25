import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  logout,
  getUserStats,
} from "../controller/user.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authMiddleware, getUser);
router.get("/userStats", authMiddleware, getUserStats);
router.post("/logout", logout);

export default router;
