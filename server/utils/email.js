import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getVerificationEmailTemplate } from "./emailtemplate.js";

dotenv.config();
//create gmail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASSWORD
    },
});
//verify smtp connection configuration
transporter.verify(function(error, success){
    if(error){
        console.error("SMTP connection error: ",error);
    }else{
        console.log("SMTP Server is ready to send mail");
    }
});
//send verification email
export const sendVerificationEmail = async (email, token, userName) => {
    const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${token}`;
    const mailOptions = {
        from:{
            name: "ระบบการแข่งขันวันวิทยาศาสตร์",
            email: process.env.EMAIL_FROM,
        },
        to: email,
        subject: "กรุณายืนยันอีเมลของคุณ - ระบบการแข่งขันวันวิทยาศาสตร์",
        html: getVerificationEmailTemplate(verificationLink, userName),
        text: `ยินดีต้อนรับเข้าสู่ระบบยืนยันงานวิทยาศาสตร์! กรุณาคลิกที่ลิงก์ด้านล่างเพื่อยืนยันอีเมลของคุณ: ${verificationLink} (ลิงก์นี้จะหมดอายุใน 24 ชั่วโมง)`,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to success: ${email}`);
    } catch (error) {
        console.error("Error sending verification email: ", error);
    }
};