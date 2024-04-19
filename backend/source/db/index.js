import mongoose from 'mongoose';

const connectDB=async()=>{
    try{
        const connectmongo=await mongoose.connect(process.env.MONGODB_URL);
        console.log(`host is :${connectmongo.connection.host}`);
    }catch(error)
    {
        console.log(`the error is in connection:${error}`);
        process.exit(1);
    }
}

export default connectDB;