import express from 'express';
import User from '../models/user.model.js';
const router=express.Router();


const genratetokens=async(_id)=>{
    
    try{
        const user=await User.findOne({_id});
        
        const AccessToken=await user.GenerateAccessTokens();
        return AccessToken;
    }
    catch(error)
    {
        console.log(`something went wrong during generating tokens:${error}`)
    }
}


router.post('/login',async(req,res)=>{
    try{
        const {password,email}=req.body;
        
        const Userentry=await User.findOne({email});
        
      
        if(!Userentry)
        {
           
          return  res.status(400).json({message:"user doesnt exist"});
        }
        const isPasswordValid=await Userentry.isPasswordCorrect(password);
        console.log(isPasswordValid);
        const username=Userentry.username;
        if(!isPasswordValid)
        {
            return res.status(400).json({message:"invalid password"});
        }
        const token=await genratetokens(Userentry._id);
  
        res.cookie('token',token,{httpOnly:true,maxAge:3600000})
        


        res.status(200).json({message:`login succesfull ${email}`,username,token})
        

    }
    catch(error){
        res.status(400).json({message:`error in login:${error}`})
    }
})
export default router;

