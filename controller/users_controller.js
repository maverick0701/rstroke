const User = require("../models/user");
const Path = require("path");
const Form = require("../models/pdfForm");
const puppeteer = require("puppeteer");
const { compile, localsName } = require("ejs");
const { resolve } = require("path");
const Personal_Information = require("../models/personalInfo");
const todays_date = new Date();
require("dotenv").config({
  path: Path.join(__dirname, "..", "env", "one.env"),
});

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render("_secondPage.ejs", {
      user: user,
    });
  });
};
keyToDb = (key) => {
  if (key == "Personal_Information") {
    return Personal_Information;
  }
};
module.exports.resume = async function (req, res) {
  Form.findOne({ id: 1 }, (err, form) => {
    let user = req.user;
    let newForm = form._doc;
    delete newForm._id;
    delete newForm.id;
    delete newForm.numTrue;
    let keys = new Array();
    for (var prop in newForm) {
      keys.push(prop);
    }

    keys.forEach((key) => {
      user[key] = [];
      keyToDb(key).clear(req.user);

      keyToDb(key).create(
        {
          id: req.user,
        },
        (err, db) => {
          console.log("created");
          newForm[key].forEach((elem) => {
            db[elem] = req.body[elem];
          });
          db.save().then(() => {
            user[key].push(db._id);
            user.save();
          });
        }
      );
    });
    return res.render("_fourth.ejs");
  });
};
