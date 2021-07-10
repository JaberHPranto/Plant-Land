import express from 'express'
import { authUser, forgetPassword, getUserProfile, getUsers, registerUser, resetPassword, updateUserProfile } from '../controller/userController.js'
import { isAdmin, isLoggedIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/",isLoggedIn,isAdmin,getUsers)
router.post("/login", authUser)
router.post("/register",registerUser)
router.route("/profile").get(isLoggedIn, getUserProfile).put(isLoggedIn, updateUserProfile)
router.post("/forget-password", forgetPassword)
router.put("/reset-password/:resetToken",resetPassword)



export default router