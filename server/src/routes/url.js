// routes/urlRoutes.js
import express from "express";
import { changeUrl } from "../controller/url.js";

const router = express.Router();

router.post("/shorten", changeUrl); // for creating short URLs


export default router;
