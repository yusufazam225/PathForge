import express from 'express';
import User from '../models/user.model.js';
const router=express.Router();


const genratetokens=async(userid)=>{
    try{
        const user=await User.findOne({userid});
        const AccessToken=user.GenerateAccessTokens();
        return AccessToken;
    }
    catch(error)
    {
        console.log(`something went wrong during generating tokens:${error}`)
    }
}


router.post('/login',async(req,res)=>{
    try{
        const {password,entry}=req.body;
        
        const Userentry=User.findOne({entry});
        if(!Userentry)
        {
          return  res.status(400).json({message:"user doesnt exist"});
        }
        const isPasswordValid=await User.isPasswordCorrect(password);
        if(!isPasswordValid)
        {
            return res.status(400).json({message:"invalid password"});
        }
        const token=await genratetokens(Userentry._id);
        res.cookie('token',token,{httpOnly:true,maxAge:3600000});
        res.status(200).json({message:`login succesfull ${email}`})
        

    }
    catch(error){
        res.status(400).json({message:`error in login:${error}`})
    }
})
export default router;
