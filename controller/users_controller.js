const User = require("../models/user");

const Form = require("../models/pdfForm");
const fs = require("fs");
const Path = require("path");
const puppeteer = require("puppeteer");
const { compile, localsName } = require("ejs");
const { resolve } = require("path");
const todays_date = new Date();
require("dotenv").config({
  path: Path.join(__dirname, "..", "env", "one.env"),
});

updateData = async function (user) {
  Form.findOne({ id: 1 }, (err, form) => {
    let keys = Object.keys(form._doc);
    // console.log(user);
    keys.forEach((key) => {
      if (typeof user[key] != "undefined") {
        console.log(typeof user[key], key, user[key]);
      }
    });
  });
};
module.exports.update = async function (req, res) {
  user = req.user;
  User.splashUser(user);
  await updateData(user._doc);
  // updateData(dbList, req, res);
};

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render("_secondPage.ejs", {
      user: user,
    });
  });
};
