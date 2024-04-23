import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    username:{type:String,required:true}
});
userSchema.pre("save",async function (next){
this.password=await bcrypt.hash(this.password,10)
next()
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.GenerateAccessTokens=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this._email,
            username:this._username
        },
        process.env.SECRET_KEY,
        
            { expiresIn:process.env.EXPIRY }
        

    )
}

const User=mongoose.model('User',userSchema);
export default User;