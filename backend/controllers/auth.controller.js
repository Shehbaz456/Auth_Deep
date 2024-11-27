import bcryptjs from "bcryptjs";
import crypto from "crypto";


import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail , sendResetSuccessEmail } from "../mailtrap/emails.js";

import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    console.log(userAlreadyExists);
    
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    
    const hashedpassword = await bcryptjs.hash(password, 10);

    const verificationToken = Math.floor( 100000 + Math.random() * 900000).toString();

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      verificationToken,
      verificationTokenExpiresAt:Date.now()+24*60*60*1000 // 24 hours
    });
    console.log(user);
    
    // jwt
    generateTokenAndSetCookie(res,user._id)

    await sendVerificationEmail(user.email, verificationToken );
    
    res.status(201).json({
      success:true,
      message:"User created successfully",
      user:{
        ...user._doc, password:undefined
      }
    })

    // res.status(200).json({ newUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async(req,res)=>{
  // 1 2 3 4 5 6
  const {code} = req.body;
  try {
    const user = await User.findOne({
      verificationToken:code,
      verificationTokenExpiresAt:{$gt:Date.now()}
    })

    if(!user){
      return res.status(400).json({success:false,message:'Invalid or expired verification code'})
    }
    user.isVarified=true;
    user.verificationToken=undefined;
    user.verificationTokenExpiresAt=undefined;

    await user.save();
    await sendWelcomeEmail(user.email,user.name);
    
    res.status(200).json({success:true,message:"Email Verified successfully", user:{
      ...user._doc,
      password:undefined,
    } })

  } catch (error) {
    console.log("failed to verifi Eamil: ",error);
    res.status(400).json({ success: false, message: "server Error" });
  }
}

export const login = async (req, res) => {
    const {email,password} = req.body
    try {
      const user = await User.findOne({email});
      if(!user){
        res.status(400).json({success:false , message:"invalid credentials"})
      }
      const isPasswordvalid = await bcryptjs.compare(password,user.password);
      
      if(!isPasswordvalid){
        res.status(400).json({success:false , message:"invalid email or passowrd"})
      }

      generateTokenAndSetCookie(res,user._id);
      user.lastLogin = new Date();
      await user.save();

      res.status(200).json({success:true,message:"Logged in Successfully",
        user:{
          ...user._doc,
          password:undefined
        }
      })

    }
    catch (error) {
      console.error("Error in login: ",error);
      return res.status(500).json({success:false,message: error.message})
    }

};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success:true,message:"Logged Out Successfully"})
};

export const forgotPassword = async (req,res)=>{
    const {email}= req.body
    try {
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({success:false,message:"User not found"});
      }

      // Generate reset Token 
      const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

  user.resetpasswordToken = resetToken
  user.resetpasswordExpiresAt = resetTokenExpiresAt;
  await user.save();

  // send email

  await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)
 
  res.status(200).json({success:true,message:"Password reset link send to your email"});


  } catch (error) {
    console.error("Error in forgoting password: ",error);
    return res.status(400).json({success:false,message: error.message})
    }
}

export const resetPassword = async (req,res)=>{
  try {
    const {token} = req.params;
    const {password} = req.body;
    const user = await User.findOne({
      resetpasswordToken:token,
      resetpasswordExpiresAt: { $gt: Date.now() },
    }); 
    
    if (!user) {
     return res.status(400).json({success:true,message:"Invalid or expired reset Token"})
    }

    // Update password 
    const hashedpassword = await bcryptjs.hash(password,10)
    user.password = hashedpassword;

    user.resetpasswordToken = undefined;
    user.resetpasswordExpiresAt = undefined;
    await user.save(); 

    await sendResetSuccessEmail(user.email);

    res.status(200).json({
      success:true, message:"Password reset successful"
    });
  
  } catch (error) {
    console.log("Error in reset Password", error);
    res.status(400).json({success:false, message:error.message});
      
  }
}

export const checkAuth = async(req,res)=>{
  try {
    const user = await User.findById(req.userId).select("-password") ;
    if(!user){
      return res.status(400).json({success:false,message:'User not found'});
    }

    res.status(200).json({success:true, user })

  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({success:false, message:error.message});
  }
}