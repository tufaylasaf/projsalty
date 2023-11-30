import express from "express";
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

//middleware
// router.use(
//   cors({
//     credentials: true,
//     origin: "https://projsalty.vercel.app",
//   })
// );

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

export default router;

// "start": "nodemon index.js",
