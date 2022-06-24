
const express = require("express")
const dotenv=require("dotenv");
const app = require("./app")
const connectDataBase = require("./config/database");
const cloudinary = require ("cloudinary")
const path=require("path")

// CONFIG
dotenv.config({path:"config/.env"})

const PORT=process.env.PORT||8082;
// DATABASE
connectDataBase();


// cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})



app.listen(process.env.PORT, () => {
    console.log(`server is working on port no ${PORT}`);
  });