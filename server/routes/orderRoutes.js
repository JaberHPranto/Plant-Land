import express from "express";
import { addOrderItems } from "../controller/orderController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(isLoggedIn, addOrderItems);

export default router;
