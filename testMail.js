require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendTestEmail() {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"Local Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Test Email",
      text: "Hello from local test!",
    });
    console.log("Message sent:", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

sendTestEmail();
