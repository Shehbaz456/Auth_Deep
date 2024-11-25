import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    resetpasswordToken: String,
    resetpasswordExpiresAt: Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,


},{timestamps:true})

export const User = mongoose.model('User',userSchema)