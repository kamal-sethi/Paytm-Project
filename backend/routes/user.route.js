import express from "express";
import {
    getAllUsers,
  signController,
  signupController,
  updateUser,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/signup", signupControllerController);
router.post("signin", signController);
router.put("/update", authMiddleware, updateUser);
router.get('all-users',authMiddleware,getAllUsers)

export default router;
