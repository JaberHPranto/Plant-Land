import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// @ User Login
export const authUser = async (req, res) => {
  // need data from frontend
  const { email, password } = req.body;

  try {
    // check for whether the user exist
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    // if user exist, check for password
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword)
      return res.status(404).json({ message: "Invalid Credentials" });

    // if both user and password is valid => generate a jwt
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @ User Registration
export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // check whether this email already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exist" });

    // check the password
    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords don't match" });

    //password length check
    if (password.length < 6) {
      return res
        .status(404)
        .json({ message: "Passwords must be greater than 6 characters" });
    }

    //check for empty fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(404).json({ message: "Cannot Have Empty Fields" });
    }

    // password is hashed from the user model

    // Now create the user
    const result = await User.create({ name, email, password });

    // generate the token
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET
    );

    res.status(201).json({ user: result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @ User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user_id = req.userId;
  if (user_id) {
    const user = await User.findById({ _id: user_id });
    res.status(200).json(user);
  } else {
    res.status(401);
    throw new Error("Not authorized to view profile");
  }
});

// @ Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user_id = req.userId;
  if (user_id) {
    const user = await User.findById({ _id: user_id });
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(401);
    throw new Error("Not authorized to view profile");
  }
});
