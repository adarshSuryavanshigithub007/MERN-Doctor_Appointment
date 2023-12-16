const express = require("express");
const moragan = require("morgan")
const colors = require("colors")
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors  = require('cors')
//rest object
const app = express();

//Mongo db connection

connectDB()

app.use(cors())

// doenv
dotenv.config()

// middle wear
app.use(moragan('dev'))
app.use(express.json())

// routes
app.use('/api/v1/user',require("./routes/userRoutes"))
// listen
const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`server is runnig ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.white)
})