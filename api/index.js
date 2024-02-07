import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';

import cookieParser from 'cookie-parser';

import path from 'path';
dotenv.config();

// Connect to MongoDB Database
mongoose.connect(process.env.MONGO_CONFIG).then(()=>{
    console.log("MONGODB is Connected");
});
const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(3000, ()=>{
    console.log('Server is running on Port 3000');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req,res,next)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});


