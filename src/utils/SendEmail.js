import nodemailer from 'nodemailer';

import dotenv from "dotenv";

dotenv.config({ path: "./backhend/.env" });

import "../main.js";



console.log(process.env.PORTAL_EMAIL);
console.log(process.env.PORTAL_PASSWORD);

const emailConfig = {
    service: 'gmail',
    auth: {
        user: process.env.PORTAL_EMAIL,
        pass: process.env.PORTAL_PASSWORD,
    },
};
async function sendEmailOTP(mail, otp) {
    const transporter = nodemailer.createTransport(emailConfig);
    await transporter.verify();
    const mailOptions = {
        from: process.env.PORTAL_EMAIL,
        to: mail,
        subject: 'OTP Verification',
        text: `Hi,

Thank you for signing up!

To verify your email address, please use the One-Time Password (OTP) below:

**Your OTP:${otp}**

This OTP is valid for **10 minutes**. Please do not share this code with anyone for security reasons.

If you did not request this verification, you can safely ignore this email.

Thank you,
**MAF Convertify Team**
`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return `OTP sent to ${mail} via email`;
    } catch (error) {
        throw `Error sending OTP to ${mail} via email: ${error}`;
    }
}

export { sendEmailOTP };
