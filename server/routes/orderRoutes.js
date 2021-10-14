import express from "express";
import { addOrderItems, getOrderData, getOrders, getSaleDataByYear } from "../controller/orderController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(isLoggedIn, addOrderItems);
router.route("/").get(isLoggedIn, isAdmin, getOrders);
router.get("/order-data", isLoggedIn, isAdmin, getOrderData)
router.get("/saleDataByYear",isLoggedIn,isAdmin,getSaleDataByYear)

export default router;
