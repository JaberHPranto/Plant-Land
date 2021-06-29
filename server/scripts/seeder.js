// This script is for testing insert data to and delete data from database
import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import products from '../data/products.js'
import users from '../data/users.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

dotenv.config()
connectDB()

const insertData = async () => {
    try {
        // clearing all existed data
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        // Add users
        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        // Add products
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
        await Product.insertMany(sampleProducts)

        console.log("Data inserted");

    }catch (error) {
        console.log(error);
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        // clearing all existed data
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log("Data Destroyed !!!");

    }catch (error) {
        console.log(error);
        process.exit(1)
    }  
}


if (process.argv[2] === '-d') {
    destroyData()
}
else {
    insertData()
}

/*
insertData script : node scripts/seeder.js 
destroyData script : node scripts/seeder.js -d
*/ 