import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'

import cookieParser from 'cookie-parser';

import path from 'path'

const app = express();
// Config Server
const port = 3000
dotenv.config()
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req,res,next)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

// Run Server
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
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

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


