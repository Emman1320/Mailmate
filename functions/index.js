
/* eslint-disable max-len */
// const functions = require("firebase-functions");
const express = require("express");
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
let errorEmails = [];
let errorText = "";
app.post("/send-email", async (request, response) => {
  const responseMessage = { status: {}, connectionError: false };
  const data = request.body;
  let transporter;
  try {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        type: "OAuth2",
        user: data.from,
        accessToken: decodeURIComponent(data._),
      },
    });
  } catch (error) {
    responseMessage.connectionError = true;
    console.log(error);
  }

  const sendEmail = (emailOptions, id) => {
    transporter.sendMail(emailOptions).catch((error) => {
      responseMessage.status[id] = {
        email: emailOptions.to,
        status: false,
      };
      console.log(id);  
      errorText = error.toString().slice(0, 100);
      if (emailOptions.to.includes("@")) errorEmails.push({ emailOptions, id });
      return;
    });

    responseMessage.status[id] = {
      email: emailOptions.to,
      status: true,
    };
  };
  data.mailData.forEach((recipient) => {
    sendEmail(
      {
        subject: data.subject,
        to: recipient.to,
        from: data.from,
        html: recipient.html,
      },
      recipient.id
    );
  });
  response.status(200).send({ responseMessage });
});
app.get("/error-mail", (request, response) => {
  const temp = [...errorEmails];
  const tempText = errorText;
  errorEmails = [];
  response.status(200).send({ errorEmails: temp, errorText: tempText });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}
app.listen(port, () => {
  console.log("Listening to 8080...");
});
// exports.api = functions.https.onRequest(app);

// http://localhost:5001/mail-mate/us-central1/api