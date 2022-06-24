const express = require("express")
const app = express()
const errorMiddleware = require("./middleware/error")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const dotenv = require ("dotenv")


// config
dotenv.config({ path: "./config/.env" });

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


// ROUTE IMPORTS
const user = require("./routes/userRoutes")
const movie = require("./routes/movieRoutes")
const crew = require("./routes/crewRoutes")
const theatre = require("./routes/theatreRoutes")
const booking = require("./routes/bookingRoutes")
const payment = require("./routes/paymentRoutes")

app.use("/api/v1", user)
app.use("/api/v1", movie)
app.use("/api/v1", crew)
app.use("/api/v1", theatre)
app.use("/api/v1", booking)
app.use("/api/v1", payment)



if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'){
    app.use(express.static("frontend/build"))
    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname ,'frontend','build','index.html'))
    })
  }
  

app.use(errorMiddleware)


module.exports = app