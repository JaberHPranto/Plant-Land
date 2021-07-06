import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controller/userController.js'
import { isLoggedIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/login", authUser)
router.post("/register",registerUser)
router.route("/profile").get(isLoggedIn, getUserProfile).put(isLoggedIn,updateUserProfile)


export default router