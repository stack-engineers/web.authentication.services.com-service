"use strict";
debugger;
const nodemailer = require("nodemailer");
require("dotenv").config();
const { format } = require("date-fns");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = async function (to, subject, service) {
  try {
    await transporter.sendMail({
      from: process.env.MAILER,
      to: to,
      subject: subject,
      html: `
               <h1>Service Login Alert</h1>
                <p>${service.toLocaleUpperCase()}, has been able to be logged into account successfully on ${format(
        new Date(),
        "yyyy-MM-dd"
      )}</p>
                <strong>Service Name: ${service}</strong>
                <br />
                <p>If you have any questions, feel free to reply to this email or contact our support developer at robertsims7076@gmail.com.</p>
                <span>Welcome aboard,</p>
                <a href="https://web-auth-services.netlify.app/" target="_blank">👉 Authentication Web Services</a>
                <p>Enjoy your stay!</p>
                <br />
                <p>Best Regards From <a href="https://robertsims.netlify.app/" target="_blank">robert sims</a> </p>
            `,
      text: subject,
    });

    console.log(`sent email to ${to}`);
  } catch (error) {
    console.log(error);
  }
};
