import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/profile", authController.getProfile);

export default router;
