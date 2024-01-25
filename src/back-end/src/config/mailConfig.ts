const nodemailer = require("nodemailer");

require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    }
});


async function sendEmail(toUser: string, token: string){
    const info = await transporter.sendMail({
        from: `"Wok Day" <${process.env.GMAIL_USERNAME}`,
        to: toUser,
        subject: "Please verify your email",
        text: `Please verify your email \n ${token}`,
        html: `<a href='http://localhost:3000/signup/${token}'>Click here to verify your email</a>`
    });
    console.log("Message sent: %s", info.messageId);
} 

async function sendEmailNotifs(
  toUser: string,
  subject: string,
  text: string,
  html: string
): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"Wok Day" <${process.env.GMAIL_USERNAME}>`,
      to: toUser,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("Notification email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending notification email: ", error);
    return false;
  }
}

module.exports = {
    sendEmail,
    sendEmailNotifs
}