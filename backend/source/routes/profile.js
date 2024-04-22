import express from 'express';
import jwt from 'jsonwebtoken';
const router=express.Router();
router.get("/profile",(req,res)=>{
    const {token}=req.cookies;
    try{
        jwt.verify(token,process.env.SECRET_KEY,{},(err,info)=>{
            if(err)throw err;
            res.status(200).json(info);
        })
    }
    catch(error)
    {
        res.status(400).send(`wrong in profile: ${email}`)
    }
})
export default router;