import express from "express";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import mainRouter from "./routes/index.route.js";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/v1/", mainRouter);
app.listen("5000", () => {
  console.log("server is running on 5000");
  connectDB();
});
