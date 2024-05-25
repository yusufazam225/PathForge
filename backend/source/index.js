import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/index.js';
import router from './routes/user.js';
import login from './routes/user.login.js';
import smtp from './routes/smtp.js';
import profile from './routes/profile.js';
import cors from 'cors';
import display from './routes/display.js';
import insertpoints from './routes/insertpoints.js';
import cookieParser from 'cookie-parser';
dotenv.config({
    path:'./.env'
})

const app=express();
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true}
));


app.use(express.json())
app.use('/api/users',display);
app.use('/api/users',insertpoints);
app.use('/api/users',smtp);
app.use('/api/users',router);
app.use('/api/users',login);
app.use('/api/users',profile);
connectDB().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        
        console.log(`server is running at ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log(`error is in while connecting:${err}`);
})