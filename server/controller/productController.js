import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

// getting all products @route -> api/products
export const getProducts = asyncHandler(async (req, res) => {

    // for pagination
    const pageSize = 8
    const page = req.query.pageNumber || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options:'i'
        }
    }:{}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
        .limit(pageSize)   // how many product will be shown 
        .skip(pageSize * (page - 1))  // skipping products to be shown on next page; skip till
    
    const numOfPages = Math.ceil(count/pageSize)
       
    res.json({ products, page, numOfPages })
})


// getting a product @route -> api/products/:id
export const getProductById = (async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product) 
    } catch(err){
        res.status(404).json({message:"No product found"})
    }
})


// writing review for the product @route -> api/products/:id/reviews
export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    // has a bug : won't work for google auth
    if (product) {
        const isAlreadyReviewed = product.reviews.find(r => r.user.toString() === req.userId.toString())
        if (isAlreadyReviewed) {
            res.status(404)
            throw new Error("Already Reviewed")    
        }

        if (req.userId) {
            const user = await User.findById({ _id: req.userId })
            
            const review = {
                name: user.name,
                rating: Number(rating),
                comment,
                user:user._id
            }
            
            product.reviews.push(review)

            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length
            
            await product.save()
            res.status(201).json({message:"Review Added"})

        } else {
            res.status(401)
            throw new Error("Not Authorized") 
        }


    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})