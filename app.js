import express from 'express';
import userRouter from './routes/users.routes.js';
import dotenv from 'dotenv';
import mongoose, { connect } from 'mongoose';
import connectDB from './config/db.js';

const app=express();
dotenv.config();
connectDB();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("User Management API is running...");
});

app.use("/api/users",userRouter);

export default app;