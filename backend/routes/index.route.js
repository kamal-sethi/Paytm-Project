import express from "express";
import userRoute from "./user.route.js";
import accountRoute from './accounts.js'

const router = express.Router();

router.use("/user", userRoute);
router.use('/account',accountRoute)

export default router;
