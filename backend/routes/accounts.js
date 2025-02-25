import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getBalance, transferMoney } from "../controllers/balanceController.js";

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transferMoney);

export default router;
