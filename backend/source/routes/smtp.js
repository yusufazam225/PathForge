import express from 'express';
import nodemailer from 'nodemailer'
const router=express.Router();

router.post('/smtp',(req,res)=>{
    try{
        const {email,otp}=req.body;
       
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });
          
          // async..await is not allowed in global scope, must use a wrapper
         async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: 'Admin@gmail.com', // sender address
              to: `${email}`, // list of receivers
              subject: "Hello ✔", // Subject line
              text: `Your OTP is ${otp}`, // plain text body
              //html: "<b>Succesful</b>", // html body
            });
          
            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
          }
         
            main().catch((error)=>{
              
              console.log(`error in smtp sending:${error}`);
             
              
            })
      
             return res.status(200).send({email});

          
          
    }
    catch(error)
    {
    
        console.log(`error in smtp backend:${error}`);
    }
})
export default router;