import express from 'express'
import { authUser, deleteUser, forgetPassword, getUserById, getUserProfile, getUsers, registerUser, resetPassword, updateUser, updateUserProfile } from '../controller/userController.js'
import { isAdmin, isLoggedIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/login", authUser)
router.post("/register",registerUser)
router.post("/forget-password", forgetPassword)
router.put("/reset-password/:resetToken", resetPassword)

router.route("/profile").get(isLoggedIn, getUserProfile).put(isLoggedIn, updateUserProfile)

router.get("/", isLoggedIn, isAdmin, getUsers)
// router.delete("/:id",isLoggedIn, isAdmin, deleteUser)
// router.get("/:id",isLoggedIn, isAdmin, getUserById)
// router.put("/:id", isLoggedIn, isAdmin, updateUser)
router.route("/:id").get(isLoggedIn,isAdmin,getUserById).put(isLoggedIn,isAdmin,updateUser).delete(isLoggedIn,isAdmin,deleteUser)





export default router