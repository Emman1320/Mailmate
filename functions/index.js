/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

// - API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send("Hello world!!");
});

// ----------------------------------------------------

app.post("/send-email", (request, response) => {
  const errorMessages = [];
  const accessTokenStatus = `${
    request ? "access token recievied" : "access token is not recievied"
  }`;
  try {
    const data = request.body;
    const createTransporter = () => {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          type: "OAuth2",
          user: data.from,
          accessToken: decodeURIComponent(data._),
        },
      });
      return transporter;
    };
  } catch (error) {
    errorMessages.push(error);
  }
  const sendEmail = (emailOptions) => {
    createTransporter()
      .sendMail(emailOptions)
      .catch((error) => {
        console.log(error);
        errorMessages.push(error);
      });
  };
  data.mailData.forEach((recipient) => {
    sendEmail({
      subject: data.subject,
      to: recipient.to,
      from: data.from,
      html: recipient.html,
    });
  });
  response.status(200).send({ errorMessages, accessTokenStatus });
});

exports.api = functions.https.onRequest(app);

// http://localhost:5001/mail-mate/us-central1/api
