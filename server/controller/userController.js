import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


// @ User Login
export const authUser = async (req, res) => {
    // need data from frontend
    const { email, password } = req.body;

    try {
        // check for whether the user exist
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(404).json({ message: "User not found" })
        
        // if user exist, check for password
        const isValidPassword = await bcrypt.compare(password, existingUser.password)
        if (!isValidPassword) return res.status(404).json({ message: "Invalid Credentials" })
        
        // if both user and password is valid => generate a jwt
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )

        res.status(200).json({ user:existingUser, token:token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}


// @ User Profile 
export const getUserProfile = asyncHandler(async (req, res) => {
    const user_id = req.userId
    if (user_id) {
        const user = await User.findById({_id:user_id})
        res.status(200).json({user})

    } else {
        res.status(401)
        throw new Error("Not authorized to view profile")
    }

})