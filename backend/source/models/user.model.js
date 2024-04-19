import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    username:{type:String,required:true}
});
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.GenerateAccessTokens=async function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this._email,
            username:this._username
        }

    )
}
const User=mongoose.model('User',userSchema);
export default User;