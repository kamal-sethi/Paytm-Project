import express from "express";
import { authMiddleware } from "../middleware/auth";
import { getBalance } from "../controllers/balanceController";

const router = express.Router();

router.get('/',authMiddleware,getBalance)
router.post('/transfer',authMiddleware,transferMoney)

export default router;
