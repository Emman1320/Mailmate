require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

mongoose.connect(process.env.LINK, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const emailSchema = {
  excelData: Number,
  fields: {
    primaryKey: String,
    nameField: String,
    emailField: String,
  },
  neglectedEmails: Array,
  subject: String,
  body: String,
  footer: String,
  tableStyle: {
    background: String,
    header: { border: String, color: String },
    body: { border: String, color: String },
  },
  showTable: Number,
};

const Email = mongoose.model("Email", emailSchema);

app
  .route("/")
  .get((req, res) => {
    Email.find((err, foundItem) => {
      if (!err) {
        res.send(foundItem);
      } else {
        res.send(err);
      }
    });
  })
  .post((req, res) => {
    const email = new Email(req.body);
    email.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("saved");
      }
    });
  })
  .delete((req, res) => {
    Email.deleteMany(function (err) {
      if (!err) {
        res.send("Successfully deleted");
      }
    });
  });

//----------------------------------------------------
app
  .route("/:id")
  .delete((req, res) => {
    const id = req.params.id;
    Email.findByIdAndRemove(id, (err) => {
      if (!err) {
        res.send("deleted " + id);
      }
    });
  })
  .patch((req, res) => {
    Email.update({ _id: req.params.id }, { $set: req.body }, function (err) {
      if (!err) {
        res.send("Successfully updated");
      }
    });
  });
