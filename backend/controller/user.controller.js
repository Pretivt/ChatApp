



import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; // Fix typo in the import (was "bycrypt")
import createTokenAndSaveCookie from "../jwt/generateToken.js";

export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  try {
    // Validate inputs

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token and send response
    createTokenAndSaveCookie(newUser._id, res);
    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//login

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invaid  user credential" });
    }
    createTokenAndSaveCookie(user._id, res);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
     return res.status(500).json({ error: "Internal Server error" });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ eror: "Internal server error" });
  }
};

//for data fetching from the backend

export const allUsers= async(req,res)=>{
  try{
    const loggedInUser=req.user._id;
    const filteredUsers=await User.find({_id:{ $ne: loggedInUser }}).select("-password");
    res.status(201).json(filteredUsers);
  }
  catch(error){
    console.log("Error in allUsers Controller:"+error)
  }
};