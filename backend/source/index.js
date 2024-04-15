import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/index.js';
import router from './routes/user.js';
dotenv.config({
    path:'./.env'
})
const app=express();
app.use(express.json())


app.use('/api/users',router);

connectDB().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        
        console.log(`server is running at ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log(`error is in while connecting:${err}`);
})