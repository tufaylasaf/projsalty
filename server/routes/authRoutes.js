const express = require("express");
const router = express.Router();
// const cors = require("cors");
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

module.exports = router;

// "start": "nodemon index.js",
