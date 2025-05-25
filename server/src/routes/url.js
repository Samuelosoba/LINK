import express from "express";
import {
  changeUrl,
  redirectUrl,
  updateUrl,
  deleteUrl,
  getUserLinks,
  getAnalytics,
} from "../controller/url.js";
import optionalAuth from "../middleware/optionalAuth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/shorten", optionalAuth, changeUrl);
router.get("/user-links", authMiddleware, getUserLinks);
router.get("/analytics/:shortPath", authMiddleware, getAnalytics);
router.get("/:shortPath", redirectUrl);
router.patch("/:shortPath", updateUrl);
router.delete("/:shortPath", deleteUrl);

export default router;
