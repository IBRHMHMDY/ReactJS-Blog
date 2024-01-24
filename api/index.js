import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
const port = 3000
dotenv.config()

app.listen(port, ()=>{
    console.log('Server is running on Port '+ port);
})

mongoose.connect(process.env.MONGO_CONFIG).then(()=>{
    console.log("Database is Connected Successfully");
})

