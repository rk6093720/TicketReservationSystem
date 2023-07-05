const express = require("express");
const mongoose = require("mongoose");
const {Connect} = require("./config/db")
const app = express();
const Port = process.env.PORT || 8000;
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello");
})
app.listen(Port,async()=>{
    try {
        await Connect;
        console.log("Connection Successfully")
    } catch (error) {
        console.log("Connection has not successfully");
        console.log(error);
    }
    console.log(8080)
})