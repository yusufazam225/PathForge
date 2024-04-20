import express from 'express';
const router=express.Router();
router.post('/smtp',(req,res)=>{
    try{
        const {email}=req.body;
        console.log(email);
       return res.status(200).json({email});
    }
    catch(error)
    {
        console.log(`error in smtp backend:${error}`);
    }
})
export default router;