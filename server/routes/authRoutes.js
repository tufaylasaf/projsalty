const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/profile", authController.getProfile);

router.get("/recentUsers", authController.getRecentUserNames);

router.get("/search", authController.search);

router.post("/review", authController.review);

router.get("/review/:id", authController.getReview);

router.get("/:name", authController.getRecipes);

router.get("/:name/:id", authController.getRecipe);

router.put("/:name/:id", authController.updateRecipe);

router.post("/:name", authController.saveRecipe);

module.exports = router;
