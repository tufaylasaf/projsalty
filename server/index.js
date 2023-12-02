import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is allowed, or allow all origins with a wildcard
    const allowedOrigins = [
      "https://projsalty.vercel.app",
      "https://projsalty-api.vercel.app",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// Allow specific origin(s)
// app.use(
//   cors({
//     origin: [
//       "https://projsalty-api.vercel.app",
//       "https://projsalty.vercel.app",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Hello There!");
});

app.use("/", authRoutes);

app.listen(5000, () => {
  console.log(`Server is running on port ${port}`);
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
