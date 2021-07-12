import express from 'express'
import { createProduct, createProductReview, deleteProductById, getProductById, getProducts, updateProduct } from '../controller/productController.js'
import { isAdmin, isLoggedIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/",getProducts)
router.get("/:id", getProductById)
router.post("/",isLoggedIn,isAdmin,createProduct)
router.put("/:id",isLoggedIn,isAdmin,updateProduct)
router.post("/:id/reviews", isLoggedIn, createProductReview)
router.delete("/:id",isLoggedIn, isAdmin,deleteProductById)

export default router