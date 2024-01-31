import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'

import cookieParser from 'cookie-parser';
// Config Server
const port = 3000
dotenv.config()

// Run Server
const app = express();
app.use(express.json())
app.use(cookieParser())
app.listen(port, ()=>{
    console.log('Server is running on Port '+ port);
});
// Connect to MongoDB Database
mongoose.connect(process.env.MONGO_CONFIG).then(()=>{
    console.log("MONGODB is Connected");
});
// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// Create Messages Errors
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});


