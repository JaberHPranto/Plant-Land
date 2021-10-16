import express from "express";
import { addOrderItems, getOrderById, getOrderData, getOrders, getSaleDataByMonth, getSaleDataByYear, saleByAProduct, updateOrderToPaid } from "../controller/orderController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(isLoggedIn, addOrderItems);
router.route("/").get(isLoggedIn, isAdmin, getOrders);
router.get("/order-data", isLoggedIn, isAdmin, getOrderData)
router.get("/saleDataByYear", isLoggedIn, isAdmin, getSaleDataByYear)
router.post("/saleDataByMonth", isLoggedIn, isAdmin, getSaleDataByMonth)
router.post("/saleByAProduct", isLoggedIn, isAdmin, saleByAProduct)
router.get("/:id",isLoggedIn, getOrderById);
router.put("/:id/pay",isLoggedIn,updateOrderToPaid);



export default router;
