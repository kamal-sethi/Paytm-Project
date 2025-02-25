import express from "express";
import {
  getAllUsers,
  signInController,
  signupController,
  updateUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/signin", signInController);
router.put("/update", authMiddleware, updateUser);
router.get("/all-users", authMiddleware, getAllUsers);

export default router;
