import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
        res.json(products)
})

export const getProductById = (async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product) 
    } catch(err){
        res.status(404).json({message:"No product found"})
    }
})