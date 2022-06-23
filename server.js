const app= require("./app")
const dotenv=require("dotenv");
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

if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'){
  app.use(express.static("frontend/build"))
  app.get('*',(req,res)=>{
    res.sendFile(path.join(_dirname +'frontend/build/index.html'))
  })
}


app.listen(process.env.PORT, () => {
    console.log(`server is working on port no ${PORT}`);
  });