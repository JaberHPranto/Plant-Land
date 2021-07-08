import bcrypt from 'bcrypt';
import crypto from 'crypto';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { sendEmail } from '../utils/sendEmail.js';


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


// @ User Registration 
export const registerUser = async (req,res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        // check whether this email already exist or not
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(404).json({ message: "User already exist" })
        
        // check the password
        if (password !== confirmPassword) return res.status(404).json({ message: "Passwords don't match" })
        
        // password is hashed from the user model

        // Now create the user
        const result = await User.create({name,email,password})
        
        // generate the token
        const token = jwt.sign({ email: result.email, id: result._id },
            process.env.JWT_SECRET)
        
        res.status(201).json({user:result,token})
            
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
    }

} 


// @ User Profile 
export const getUserProfile = asyncHandler(async (req, res) => {
    const user_id = req.userId
    if (user_id) {
        const user = await User.findById({_id:user_id})
        res.status(200).json(user)

    } else {
        res.status(401)
        throw new Error("Not authorized to view profile")
    }

})


// @ Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user_id = req.userId
    if (user_id) {
        const user = await User.findById({_id:user_id})
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json(updatedUser)

    } else {
        res.status(401)
        throw new Error("Not authorized to view profile")
    }

})



// @ forget password
export const forgetPassword = async (req, res) => {
    const { email } = req.body
    
    try {
        const user = await User.findOne({ email })
        if (!user)
            return res.status(404).json({error:"User doesn't exist"})
        
        const resetToken = user.getPasswordResetToken()


        // user.resetPasswordToken = user.resetPasswordToken
        // user.resetPasswordExpire = user.resetPasswordExpire
        await user.save()

        const resetUrl = `http://localhost:3000/forget-password/${resetToken}`
        const message = `
           <h1> Plant Land </h1>
           <h2>You have requested a password reset</h2>
           <p>Please go to this link to reset your password</p>
           <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        // sending mail
        try {
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Request',
                text: message
            })
            res.status(200).json({ message: 'Success',data:"Email Sent" ,resetToken})
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()
            console.log(error);
            res.status(500).json("Failed to send email")
        }

        res.status(200).json({ message: 'Success',data:"Email Sent"})

        
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Forget password failed" })
    }
}

// @ reset password
export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ error: "Invalid Reset Token" })
        }

        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        res.status(200).json({success:true,data:'Password reset success'})

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to reset password" })
    }
}