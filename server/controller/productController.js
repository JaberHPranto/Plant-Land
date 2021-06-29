import asyncHandler from 'express-async-handler'

export const getProducts = asyncHandler(async (req, res) => {
    res.send("Getting Products...")
})

export const getProductById = asyncHandler(async (req, res) => {
    res.send("Getting Product by id...")
})