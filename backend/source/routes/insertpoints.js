import express from 'express';
import User from './../models/points.model.js'


const router=express.Router();
router.post('/insertpoints',async(req,res)=>{
    try{
    const {grid,coordinatesArray,userinfo,imageData}=req.body;

    const newUser = await User.create({  
        grid,
        coordinatesArray,
        userinfo,
        imageData
    })
    
}catch(error){
        console.log(`error in insertpoints:${error}`);
    }
    
    

})
export default router;
