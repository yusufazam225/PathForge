import express from 'express';
import jwt from 'jsonwebtoken';
const router=express.Router();
router.get("/profile",(req,res)=>{
    const token = req.headers['authorization'].split(' ')[1];
   
    console.log("----->",token)
    try{
       const decodeData = jwt.verify(token,process.env.SECRET_KEY,)
       res.status(200).json({username:decodeData.username})
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send({
            error:error.message,
        });
    }
})
export default router;