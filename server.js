const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.static("public"));
app.use(express.json());

// API route
app.post("/send-email", async (req, res) => {
  const { name, email, phone, country, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail", // Or other SMTP provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `Client Enquiry from ${email} about ${subject}`,
      html: `
         <div style="background-color: #1c1c1c; color: #f5f5f5; font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.4);">

          <div style="padding: 20px; text-align: center; background-color: #2c2c2c;">

       <img src="https://i.postimg.cc/XY5jRHBZ/logo-dark.png" alt="DCM Logo" style="max-height: 60px; display: block; margin: auto;" />
       
     </div>
      <div style="padding: 20px;">  
      <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 10px; text-align: center;">New Client Enquiry</h2>
      <p style="font-size: 14px; line-height: 1.6; color: #ccc; text-align: center;">You've received a new enquiry. Here are the details:</p>

      <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; color: #aaa; font-weight: bold;">Name:</td>
          <td style="padding: 10px; color: #fff;">${name}</td>
        </tr>
        <tr style="background-color: #2a2a2a;">
          <td style="padding: 10px; color: #aaa; font-weight: bold;">Email:</td>
          <td style="padding: 10px; color: #fff;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; color: #aaa; font-weight: bold;">Phone Number:</td>
          <td style="padding: 10px; color: #fff;">${phone}</td>
        </tr>
        <tr style="background-color: #2a2a2a;">
          <td style="padding: 10px; color: #aaa; font-weight: bold;">Country:</td>
          <td style="padding: 10px; color: #fff;">${country}</td>
        </tr>
        <tr>
          <td style="padding: 10px; color: #aaa; font-weight: bold;">Message:</td>
          <td style="padding: 10px; color: #fff;">${message}</td>
        </tr>
      </table>


            <p style="margin-top: 30px; font-size: 14px; color: #bbb; line-height: 1.6;">
        Thank you for choosing DCM. We'll get back to you as soon as possible.
      </p>

      <p style="margin-bottom: -10px;"><strong>Best regards,</strong></p>
      <p style="font-weight: bold; color: #f5f5f5;">DCM Team</p>
    </div>

    <div style="text-align: center; padding: 10px 20px 20px; font-size: 12px; color: #777;">
      &copy; ${new Date().getFullYear()} DCM. All rights reserved.
    </div>
        </div>
      `,
    });
    res.status(200).json({ message: "Email sent!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// New compatible ways:  if you're using a single-page app (SPA) and want to serve index.html for any route:
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
