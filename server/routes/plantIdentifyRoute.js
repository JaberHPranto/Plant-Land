import express from 'express'
import { IdentifyPlant } from '../controller/plantIdentifyController.js'
const router = express.Router()

router.post("/",IdentifyPlant)


export default router