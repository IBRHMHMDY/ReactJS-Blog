import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

const port = 3000
dotenv.config()


// Run Server
const app = express();
app.listen(port, ()=>{
    console.log('Server is running on Port '+ port);
})
// Connect to MongoDB Database
mongoose.connect(process.env.MONGO_CONFIG).then(()=>{
    console.log("Database is Connected Successfully");
});
// API Routes
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

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


