// const express = require("express");
import dotenv from "dotenv"
dotenv.config();
import express from "express";
const app = express()
import { connectDB } from "./db/connectDB.js";
import authRouter from "./routers/auth.route.js"

const PORT = process.env.PORT || 8000;
// console.log( process.env.PORT);

app.use(express.json());


app.use("/api/auth",authRouter)



connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`);    
    })
}).catch((error)=>{
    console.log(error);
})    
