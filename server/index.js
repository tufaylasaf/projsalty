import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const express = require("express");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

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

// app.use("/", authRoutes);

// const port = 8000;
app.listen(5000, () => console.log(`Server is running on port ${port}`));

mongoose
  .connect(
    "mongodb+srv://tufayl:no7158lyafut@cluster0.klpi1zw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not Connected", err));
