import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";

// Routes
import urlRoutes from "./routes/url.js";
import { redirectUrl } from "./controller/url.js"; // ✅ Import redirect handler directly

const app = express();

// CORS
const corsOptions = {
  origin: ["http://localhost:5173"],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(morgan("dev"));
app.use(json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

// Root route
app.get("/", (req, res) => {
  res.send("Hello URL shortener");
});

// API route (shorten)
app.use("/api/url", urlRoutes);

// ✅ Redirect route — must come after API routes and ABOVE error handler
app.get("/:shortPath", redirectUrl);

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  let errorMessage = "Internal Server Error";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
