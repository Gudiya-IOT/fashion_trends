const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const morgan = require("morgan");

const PORT = process.env.PORT || 6000 || 8080;   //or ports; vese toh not work

const connectDB = require("./config/db")
connectDB();                                //connectDb called; asynchronous func so baad me run eventhough phle write

const app = express();                      // express called; synchronous func


/////////////////////////////////////////////////////     //5/8/24
// app.get("/",(req,res)=>{                  //root route
//     res.send("api is working");
// });

// const rootroute = require("./routes/rootroute");
// app.use("/fashiontrends",rootroute);              //"/fashiontrends"=base-url
//////////////////////////////////////////////////

                                               //6/8/24
const rootroute = require("./routes/rootroute");
app.use("/",rootroute);

const productroute = require("./routes/productroute");
app.use("/fashiontrends",productroute);


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`.bgBlue.white);
});