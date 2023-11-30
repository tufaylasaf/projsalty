import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
// Allow specific origin(s)
app.use(
  cors({
    origin: "https://projsalty.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Hello There!");
});

// app.post("/register", async (req, res) => {
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

// app.use("/tuf", require("./routes/authRoutes"));

// const port = 8000;
app.listen(5000, () => console.log(`Server is running on port ${port}`));

mongoose
  .connect(
    "mongodb+srv://tufayl:no7158lyafut@cluster0.klpi1zw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not Connected", err));
