import express from "express";
// const cors = require("cors");
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";

const router = express.Router();

//middleware
// router.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

// router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

export default router;
