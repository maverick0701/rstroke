const User = require("../models/user");
const Path = require("path");
const Form = require("../models/pdfForm");
const puppeteer = require("puppeteer");
const { compile, localsName } = require("ejs");
const { resolve } = require("path");
const Personal_Information = require("../models/personalInfo");
const Education = require("../models/education");
const University = require("../models/university");
const Skill = require("../models/skill");
const Language = require("../models/language");
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
  // console.log(key, "key");
  if (key == "Personal_Information") {
    return Personal_Information;
  }
  if (key == "Education") {
    return Education;
  }
  if (key == "University") {
    return University;
  }
  if (key == "Skill") {
    return Skill;
  }
  if (key == "Language") {
    return Language;
  }
};
async function handleDb(keys, req, user, newForm) {
  let i = 0;
  console.log(req.body.language_2);
  keys.forEach(async (key) => {
    await keyToDb(key).clear(req.user);
    let db = await keyToDb(key).create({
      id: req.user,
    });
    newForm[key].forEach((elem) => {
      db[elem] = req.body[elem];
    });

    db.save();
  });
}
module.exports.resume = async function (req, res) {
  Form.findOne({ id: 1 }, async (err, form) => {
    let user = req.user;
    let newForm = form._doc;
    delete newForm._id;
    delete newForm.id;
    delete newForm.numTrue;
    let keys = new Array();
    for (var prop in newForm) {
      keys.push(prop);
    }
    handleDb(keys, req, user, newForm);
    return res.render("_fourth.ejs");
  });
};
