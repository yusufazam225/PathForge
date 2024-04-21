import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/smtp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Create a nodemailer transporter with SMTP credentials fetched from environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'Admin@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: `Your OTP is ${otp}`, // plain text body
            //html: "<b>Succesful</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).send({ email });

    } catch (error) {
        console.error(`Error in smtp backend: ${error}`);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

export default router;
