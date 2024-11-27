// const express = require("express");
import dotenv from "dotenv"
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import { connectDB } from "./db/connectDB.js";
import authRouter from "./routers/auth.route.js"

const app = express()
const PORT = process.env.PORT || 8000;
// console.log( process.env.PORT);

app.use(express.json()); //  allows us to parse incoming requests: req.body
app.use(cookieParser()); // allows us to parse incoming cookies  

app.use("/api/auth",authRouter)



connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`);    
    })
}).catch((error)=>{
    console.log(error);
})    
