const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const morgan = require("morgan");

const PORT = process.env.PORT || 6000 || 8080;   //or ports; vese toh not work

const app = express();

const connectDB = require("./config/db")
connectDB()                                         //connectDb called


app.get("/",(req,res)=>{
    res.send("api is working");
});

const rootroute = require("./routes/rootroute");
app.use("/fashiontrends",rootroute);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`.bgBlue.white);
});