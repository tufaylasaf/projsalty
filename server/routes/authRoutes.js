import express from "express";
import User from "../models/user.js";
// const cors = require("cors");
// import {
//   registerUser,
//   loginUser,
//   //   getProfile,
// } from "../controllers/authController.js";

const router = express.Router();

//middleware
// router.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

// router.get("/", test);
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }

    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return res.json({
        error: "Email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
});
// router.post("/login", loginUser);
// router.get("/profile", getProfile);

export default router;
