import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import cors from "cors";
import './cron/autoDeleteUser.js'; // Import the cron job to ensure it runs
dotenv.config();
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

connectDb().then(() => {
  console.log("db is connected");
  app
    .listen(process.env.PORT || 3000, () => {
      console.log("app is listening on port 3000");
    })
    .on("error", (err) => {
      console.error("Error starting server:", err);
    });
});

app.get("/", (req,res) => {
  res.send("Everything fine")
})


import {router } from "./routes/All.routes.js"

app.use("/api",router);


