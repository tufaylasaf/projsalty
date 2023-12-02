import express from "express";
// import User from "../models/user.js";
// import auth from "../helpers/auth.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

import { registerUser } from "../controllers/authController.js";

const router = express.Router();

// const hashPassword = (password) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.genSalt(12, (err, salt) => {
//       if (err) {
//         reject(err);
//       }
//       bcrypt.hash(password, salt, (err, hash) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(hash);
//       });
//     });
//   });
// };

// const comparePassword = (password, hashed) => {
//   return bcrypt.compare(password, hashed);
// };

// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name) {
//       return res.json({
//         error: "Name is required",
//       });
//     }

//     if (!password || password.length < 6) {
//       return res.json({
//         error: "Password is required and should be at least 6 characters long",
//       });
//     }

//     const exist = await User.findOne({ email });

//     if (exist) {
//       return res.json({
//         error: "Email already exists",
//       });
//     }

//     // const hashedPassword = await hashPassword(password);

//     const user = await User.create({
//       name,
//       email,
//       password,
//     });

//     return res.json(user);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/register", registerUser);

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.json({
//         error: "No User found",
//       });
//     }

//     const match = await comparePassword(password, user.password);
//     if (match) {
//       jwt.sign(
//         { email: user.email, id: user._id, name: user.name },
//         process.env.JWT_SECRET,
//         {},
//         (err, token) => {
//           if (err) throw err;
//           res.cookie("token", token).json(user);
//         }
//       );
//     }
//     if (!match) {
//       res.json({
//         error: "Passwords do not match",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
// router.get("/profile", getProfile);

export default router;
