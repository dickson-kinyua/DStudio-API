import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();

//middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://d-studio-ui.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // If your request includes cookies or authentication
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.FRONT_END_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(cookieParser());
app.use(express.json());
// Middleware to parse URL-encoded data (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB)
  .then((result) => {
    console.log("Connected to the database");
    app.listen(process.env.PORT, () =>
      console.log(`Listening to port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log("Could not connect to the database"));

app.use(routes);
