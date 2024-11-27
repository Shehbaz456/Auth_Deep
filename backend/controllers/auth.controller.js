import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

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
    
    res.status(200).json({success:true,message:"Email Varified successfully", user:{
      ...user._doc,
      password:undefined,
    } })

  } catch (error) {
    console.log("Error in Varifing Eamil: ",error);
    res.status(400).json({ success: false, message: "server Error" });
  }
}

export const login = async (req, res) => {
  res.send("login route");
};

export const logout = async (req, res) => {
  res.send("logout route");
};


