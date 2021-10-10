import multiparty from 'connect-multiparty'
import express from 'express'
import multer from 'multer'
import path from 'path'
import cloudinary from '../utils/cloudinary.js'

const router = express.Router()
const hostUrl = `http://localhost:3000`

const uploadPath = './uploads/'

const multipartMiddleware = multiparty({uploadDir:uploadPath});

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
        // res.send(`uploads/${req.file.filename}`)
        res.send(result.secure_url)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Image Only'})
    }
})

router.post('/ck-image', multipartMiddleware, async function(req, res) {
    const tempFile = req.files.upload.path
    try {
        res.status(200).json({
            uploaded: true,
            url: `${hostUrl}/${tempFile}`
         
        })
    } catch (err) {
        console.log(err);
        res.status(500).json("Couldn't upload the images")
    }
    
});

export default router

