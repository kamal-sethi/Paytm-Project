import express from "express";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get('/',authMiddleware,getBalance)

export default router;
