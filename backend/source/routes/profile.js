import express from 'express';
import jwt from 'jsonwebtoken';
const router=express.Router();
router.get("/profile",(req,res)=>{
    
//    console.log(req.cookies);
    const {token}=req.cookies;
  
    try{
        jwt.verify(token,process.env.SECRET_KEY,{},(err,info)=>{
            if(err) throw err;
            console.log("success")
            res.status(200).json(info);
        })
    }
    catch(error)
    {
        res.status(400).send(`wrong in profile`)
    }
})
export default router;