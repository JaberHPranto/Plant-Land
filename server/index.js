import dotenv from 'dotenv';
import express from 'express';

const app = express()
dotenv.config()


app.get("/",(req,res) => {
    res.send("Hello world")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res) => {
    console.log(`Server started on port ${PORT}` );
})
