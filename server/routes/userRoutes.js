import express from 'express'
import { authUser, getUserProfile, registerUser } from '../controller/userController.js'
import { isLoggedIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/login", authUser)
router.post("/register",registerUser)
router.route("/profile").get(isLoggedIn, getUserProfile)


export default router