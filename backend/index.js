import express from "express";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.listen("5000", () => {
  console.log("server is running on 5000");
  connectDB();
});
