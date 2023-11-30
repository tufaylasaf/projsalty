import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

// const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));

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

app.listen(5000, () => {
  console.log(`App is listening to port : ${PORT}`);
});
mongoose
  .connect(
    "mongodb+srv://tufayl:no7158lyafut@cluster0.klpi1zw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

// mongoose
//   .connect(
//     "mongodb+srv://tufayl:no7158lyafut@cluster0.klpi1zw.mongodb.net/?retryWrites=true&w=majority"
//   )
//   .then(() => console.log("Database Connected"))
//   .catch((err) => console.log("Database not Connected", err));
