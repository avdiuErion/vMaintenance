const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Db connected: ${conn.connection.host}`);  
      }catch(error){
          console.log(error);
      }
    }


module.exports = connectDB;