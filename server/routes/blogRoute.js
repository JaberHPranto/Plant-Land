import express from 'express'
import { getBlogs, postBlogs } from '../controller/blogController.js'
import { isLoggedIn } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get("/", getBlogs)
router.post("/",isLoggedIn,postBlogs)


export default router