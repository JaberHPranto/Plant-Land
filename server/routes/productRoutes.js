import express from 'express'
import { createProductReview, getProductById, getProducts } from '../controller/productController.js'
import { isLoggedIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/",getProducts)
router.get("/:id", getProductById)
router.post("/:id/reviews",isLoggedIn,createProductReview)

export default router