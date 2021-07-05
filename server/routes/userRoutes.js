import express from 'express'
import { authUser } from '../controller/userController.js'

const router = express.Router()

router.post("/login",authUser)


export default router