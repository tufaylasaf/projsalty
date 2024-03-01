const User = require("../models/user");
const Recipe = require("../models/recipe");
const Review = require("../models/review");
const auth = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }

    const existUsername = await User.findOne({ name });

    if (existUsername) {
      return res.json({
        error: "Username already exists",
      });
    }

    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.json({
        error: "Email already exists",
      });
    }

    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    const hashedPassword = await auth.hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      return res.json({
        error: "No User found",
      });
    }

    const match = await auth.comparePassword(password, user.password);
    if (match) {
      const token = jwt.sign({ userId: user._id, name: name }, "864197532", {
        expiresIn: "4h",
      });

      // Set the token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      // Send additional data if needed
      res.json({ message: "Login successful", user });
    }
    if (!match) {
      res.json({
        error: "Passwords do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, "864197532", {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

const getRecentUserNames = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ registerDate: -1 })
      .limit(7)
      .select("name registerDate");

    return res.status(200).json({ count: users.length, data: users });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const saveRecipe = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) {
      return res.status(400).send({
        message: "Send all required fields: title, description",
      });
    } else {
      const { name } = req.params;

      // Find the user by name
      const user = await User.findOne({ name });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newRecipe = {
        title: req.body.title,
        description: req.body.description,
        user: user._id,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
      };

      const recipe = await Recipe.create(newRecipe);

      return res.status(201).send(recipe);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const { name } = req.params;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recipes = await Recipe.find({ user: user._id });

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { name, id } = req.params;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recipes = await Recipe.find({ user: user._id, _id: id });

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = req.body; // Updated recipe data

    const updatedDoc = await Recipe.findByIdAndUpdate(id, updatedRecipe, {
      new: true, // Return the updated document
    });

    if (updatedDoc) {
      res.json(updatedDoc); // Send the updated recipe data
    } else {
      res.status(404).send("Recipe not found"); // Handle not found cases
    }
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).send("Internal server error"); // Handle unexpected errors
  }
};

const search = async (req, res) => {
  const searchTerm = req.query.q;

  try {
    // Search for users with a matching name or email
    const users = await User.find({
      $or: [
        { name: { $regex: new RegExp(searchTerm, "i") } },
        { email: { $regex: new RegExp(searchTerm, "i") } },
      ],
    }).select("name"); // Select only the 'name' field

    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, "i") } },
        { description: { $regex: new RegExp(searchTerm, "i") } },
        { "user.name": { $regex: new RegExp(searchTerm, "i") } }, // Match the associated user's name
      ],
    })
      .select("title user") // Select 'title' and 'user' fields
      .populate("user", "name"); // Populate the 'user' field with only the 'name' field

    // Check if either users or recipes are found
    if (users.length === 0 && recipes.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    res.json({ users, recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const review = async (req, res) => {
  const newReview = {
    rating: req.body.rating,
    review: req.body.review,
    recipe: req.body.recipe,
    user: req.body.user,
  };

  const review = Review.create(newReview);

  return res.status(201).send(review);
};

const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ recipe: id });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getRecentUserNames,
  saveRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  search,
  review,
  getReview,
};
