const User = require("../models/user");
const Form = require("../models/pdfForm");
const proj = require("../models/project");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { format } = require("path");
const todays_date = new Date();

module.exports.home = function (req, res) {
  return res.render("_homePage.ejs");
};

module.exports.display = function (req, res) {
  return res.redirect("/");
};

module.exports.create = function (req, res) {
  console.log(req.body, "**********************");

  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      req.flash("error", err);
      return;
    }

    if (!user) {
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
        function (err, user) {
          if (err) {
            console.log(error, "at line 26");
            return;
          }

          return res.redirect("/");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};

module.exports.second = function (req, res) {
  return res.render("_secondPage.ejs");
};

// keyOperation = (keys, form) => {
//   let id1 = keys.indexOf("_id");
//   keys.splice(id1, 1);
//   let id2 = keys.indexOf("id");
//   keys.splice(id2, 1);
//   let id3 = keys.indexOf("numTrue");
//   keys.splice(id3, 1);
//   var newKey = new Array();
//   keys.forEach((key, index) => {
//     if (form[key] != false) {
//       newKey.push(key);
//     }
//   });
//   keys = newKey;
//   return keys;
// };

module.exports.third = async function (req, res) {
  Form.findOne({ id: 1 }, (err, form) => {
    let keys = Object.keys(form._doc);
    return res.render("_thirdPage.ejs", {
      keys: keys,
    });
  });
};

module.exports.upload = async function (req, res) {
  let user = await User.findById(req.user.id);
  User.uploadedAvatar(req, res, function (err) {
    console.log(req.file);
    if (req.file) {
      if (user.avatar) {
        fs.unlinkSync(path.join(__dirname, "..", user.avatar));
      }
      user.avatar = User.avatarPath + "/" + req.file.filename;
    }
    user.save();
  });
  return res.redirect("back");
};

module.exports.resume = async function (req, res) {
  user2 = await User.findById(req.params.id)
    .populate({
      path: "profile",
      select: "profile",
    })
    .populate("abMe", "aboutMe")
    .populate({
      path: "education",
    })
    .populate("project")
    .populate({
      path: "achievement",
      select: "achievement",
    })
    .populate({
      path: "experience",
    })
    .populate("skill")
    .populate({
      path: "language",
    })
    .then((user2) => {
      user2.password = null;
      user2.email = null;
      console.log(user2.language);
      setTimeout(() => {
        res.render("_fourth.ejs", {
          user1: user2,
        });
      }, 0);
    });
};
