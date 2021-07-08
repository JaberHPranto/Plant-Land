import bcrypt from 'bcrypt'
import crypto from 'crypto'
import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps:true
})

// for hashing password before saved to database
userSchema.pre('save', async function (next) {
    // for not generate a new hash if password field in not updated
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

// method for forget password
userSchema.methods.getPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')

    // setting a field in user model
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
    
    return resetToken

}

const User = mongoose.model("User", userSchema)
export default User
