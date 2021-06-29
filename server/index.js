import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';

const app = express()
dotenv.config()


// middlewares
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())


app.get("/",(req,res) => {
    res.send("Hello world")
})

// connect to database
connectDB()

const PORT = process.env.PORT
app.listen(PORT, (req, res) => {
    console.log(`Server started on port ${PORT}` );
})
