import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

// getting all products @route -> api/products?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}

export const getProducts = asyncHandler(async (req, res) => {

    // for pagination
    const pageSize = 25
    const page = req.query.pageNumber || 1

    // for search
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options:'i'
        }
    } : {}

    // for filter by category
    const productCategory = req.query.category ? {
        category: {
            $regex: req.query.category
        }
    }:{}

    // for sorting
    // let sortFilter = ""
    // if (req.query.sort) {
    //     console.log(req.query.sort);
    //     // if(sortFilter === req.query.sort) sortFilter=""
    //     // else {
    //         if (req.query.sort === "lowest") sortFilter = "price : 1"
    //         else if (req.query.sort === "highest") sortFilter = "price : -1"
    //         else if (req.query.sort === "rating") sortFilter = "rating : -1"
    //         else if (req.query.sort === "newest") sortFilter = "createdAt : -1"
    //     // }
    // }


    
    const count = await Product.countDocuments({ ...keyword,...productCategory })
    let products = await Product.find({ ...keyword, ...productCategory })
        .limit(pageSize)   // how many product will be shown 
        .skip(pageSize * (page - 1))  // skipping products to be shown on next page; skip till

    if (req.query.sort) {
        const sortFilter = req.query.sort
        if(sortFilter === "lowest") products.sort(dynamicSort("price"))
        else if(sortFilter === "highest") products.sort(dynamicSort("-price"))
        else if(sortFilter === "rating") products.sort(dynamicSort("-rating"))
        else if(sortFilter === "newest") products.sort(dynamicSort("-createdAt"))
    }
    
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

/* ADMIN */

// getting a product @route -> api/products/:id
export const deleteProductById = (async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        await product.remove()
        res.status(200).json({message:'Product deleted successfully'})
    } catch(err){
        res.status(404).json({error:"No product found"})
    }
})

// Crating a product -> api/products (POST)
export const createProduct = (async (req, res) => {
    try {
        const product = new Product({
            name: 'Sample Product',
            description: 'Sample description',
            user: req.userId,
            image: '/images/sample.jpg',
            category: 'Sample category',
            price: 0,
            countInStock: 0,
            numReviews:0
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (err) {
        console.log(error);
        res.status(404).json({message:"Failed to create a product"})
    }
})


// Update a product -> api/products/:id (PUT)
export const updateProduct = (async (req, res) => {
    try {
        const { name, description, image, category, price, countInStock } = req.body

        const product = await Product.findById(req.params.id)
        if (product) {
            product.name= name,
            product.description= description,
            product.image= image,
            product.category= category,
            product.price= price,
            product.countInStock=countInStock
            
            const updatedProduct = await product.save()
            return res.status(201).json(updatedProduct)
            
        } else {
            return res.status(401).json({message:"Product not found"})
        }
    } catch (err) {
        console.log(error);
        res.status(404).json({message:"Failed to create a product"})
    }
})


// Filtering products - SortBy
// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}