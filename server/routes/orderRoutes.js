import express from "express";
import { addOrderItems, getOrders } from "../controller/orderController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(isLoggedIn, addOrderItems);
router.route("/").get(isLoggedIn,isAdmin,getOrders);

export default router;
