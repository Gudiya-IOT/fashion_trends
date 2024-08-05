const { bgBlue } = require("colors");
const mongoose = require("mongoose");

const connectDB = async (req, res)=>{
    try{
         await mongoose.connect(process.env.MONGO_URL);
        //  res.send({
        //     message: "Database connected",
        //  });
        console.log(`Database is connected`.bgYellow.black)
        }
    catch(error){
        // res.send({
        //     message: `Internal Server Error ${error}`,
        //     success: false,
        //     description:`database not connected`
        // });
        console.log(`Error Occured ${error}`.bgRed.white)
    }
};

module.exports = connectDB;