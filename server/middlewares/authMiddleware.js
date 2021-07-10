import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const isLoggedIn = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1]

        const isCustomAuth = token.length < 500 

        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decodedData?.id
            req.user = await User.findById(req.userId).select('-password')
        }
        else {
            // for google authentication
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }

        next()
    } catch (error) {
        console.log(error); 
        res.status(401).json({ error: "Not Authorized" })
    }
    
}


const isAdmin = (req, res, next) => {
    
    if (req.user && req.user.isAdmin) {
        next()
    }
    else {
        throw new Error("Not authorized as Admin")
    }
   
}


export { isLoggedIn, isAdmin };
    

