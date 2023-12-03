const express = require("express");
const moragan = require("morgan")
const colors = require("colors")
const dotenv = require("dotenv")
//rest object
const app = express();

// doenv
dotenv.config()
// middle wear
app.use(moragan('dev'))
app.use(express.json())

// routes
app.get('/',(res,req)=>{
    res.status(200).send({
        message:"server running"
    })
})

// listen
const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`server is runnig ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.white)
})