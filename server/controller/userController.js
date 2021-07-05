import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

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