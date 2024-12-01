import cloudinary from "../config/cloudinary.js"
import { genrateToken } from "../config/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"



// SingUP controller
export const signup = async (req, res) => {
    const { fullname, email, password } = req.body

    try {

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email Already Exists" });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })
        if (newUser) {
            // generate jwt token
            genrateToken(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });

    }

}

// LogIn controller
export const login = async (req, res) => {
    const { email, password, profilePic } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        genrateToken(user._id,res)
        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
            message:"Login successfully"
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Logout controller
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "" , {maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }

}




export const updateProfile = async (req,res) => {
  try {
    const{profilePic} = req.body;
    
    const userId = req.user._id
    if (!profilePic) {
        return res.status(400).json({message: "profile pic is required"});
    }

    // const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId,
         {profilePic: profilePic},
          {new:true}
        );

    res.status(200).json({success: true, updatedUser})
  } catch (error) {
    return res.status(500).json({message: "Internal server error"});
  }
}


export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }

}
