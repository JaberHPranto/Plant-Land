import express from 'express'
import multer from 'multer'
import path from 'path'
import cloudinary from '../utils/cloudinary.js'

const router = express.Router()

const uploadPath = './uploads/'

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null,uploadPath)
    },
    filename(req, file, cb) {
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const checkFileType = (file, cb) => {
    const fileTypes = /jpg|jpeg|png/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if (extName && mimetype) {
        cb(null,true)
    } else {
        cb(new Error("Image Only !",false))
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file,cb)
    }
})

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(`uploads/${req.file.filename}`)
        console.log(result);
        // res.send(`uploads/${req.file.filename}`)
        res.send(result.secure_url)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Image Only'})
    }
})

export default router

