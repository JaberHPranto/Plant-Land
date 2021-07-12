import express from 'express'
import { createProductReview, deleteProductById, getProductById, getProducts } from '../controller/productController.js'
import { isAdmin, isLoggedIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/",getProducts)
router.get("/:id", getProductById)
router.post("/:id/reviews",isLoggedIn,createProductReview)
router.delete("/:id",isLoggedIn, isAdmin,deleteProductById)

export default router