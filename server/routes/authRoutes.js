import express from "express";
import authController from "../controllers/authController.js";
import cors from "cors";

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: [
      "https://projsalty-api.vercel.app",
      "https://projsalty.vercel.app",
    ],
  })
);

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/profile", authController.getProfile);

export default router;
