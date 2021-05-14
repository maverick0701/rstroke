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
const Additional_information = require("../models/additionalInformation");
const Experiece = require("../models/workExperience");
const Achievement = require("../models/achievement");
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
  if (key == "Additional_information") {
    return Additional_information;
  }
  if (key == "Work_experience/Project") {
    return Experiece;
  }
  if (key == "Achievement") {
    return Achievement;
  }
};
async function handleDb(keys, req, user, newForm) {
  let i = 0;
  let promise = [];
  keys.forEach(async (key) => {
    // console.log(key);
    let prm = new Promise(async function (resolve, reject) {
      await keyToDb(key).clear(req.user);
      let db = await keyToDb(key).create({
        id: req.user,
      });
      newForm[key].forEach((elem) => {
        if (elem == "current_cgpa") {
          console.log("current_cgpa");
        }
        db[elem] = req.body[elem];
      });
      db.save().then(resolve());
    });
    promise.push(prm);
  });
  return Promise.all(promise);
}
async function getSkill(user) {
  let skill = await Skill.find({ id: user });
  if (skill == []) console.log(skill);
  while (
    skill == [] ||
    skill[0] == undefined ||
    skill[0].skill_1 == undefined
  ) {
    skill = await Skill.find({ id: user });
  }
  // console.log(skill);
  skill = skill[0];
  let skills = [];
  skills.push(skill.skill_1);
  skills.push(skill.skill_2);
  skills.push(skill.skill_3);
  skills.push(skill.skill_4);
  skills.push(skill.skill_5);
  skills.push(skill.skill_6);
  skills.push(skill.skill_7);
  return skills;
}
async function getPersonalInfo(user) {
  let info = await Personal_Information.find({ id: user });
  while (
    info == [] ||
    info[0] == undefined ||
    info[0].RESUME_OBJECTIVE == undefined
  ) {
    console.log("hihihi");
    info = await Personal_Information.find({ id: user });
  }
  return info[0];
}
async function getLan(user) {
  let lan = await Language.find({ id: user });
  while (lan == [] || lan[0] == undefined || lan[0].language_3 == undefined) {
    console.log("hi1");
    lan = await Language.find({ id: user });
  }
  return lan[0];
}
async function getAddInfo(user) {
  let addInfo = await Additional_information.find({ id: user });
  // console.log(addInfo);
  while (addInfo == [] || addInfo[0] == undefined) {
    console.log("hi2");
    addInfo = await Additional_information.find({ id: user });
  }
  return addInfo[0];
}
async function getEduForm(user) {
  let edu = await Education.find({ id: user });
  while (edu == [] || edu[0] == undefined || edu[0].school_name == undefined) {
    console.log("hi3");
    edu = await Education.find({ id: user });
  }
  return edu[0];
}
async function getExp(user) {
  let exp = await Experiece.find({ id: user });
  while (exp == [] || exp[0] == undefined || exp[0].Title_3 == undefined) {
    console.log(exp);
    exp = await Experiece({ id: user });
  }
  return exp[0];
}

async function getAch(user) {
  let ach = await Achievement.find({ id: user });
  while (ach == [] || ach[0] == undefined || ach[0].Achievement == undefined) {
    console.log("iniif loop ach");
    ach = await Achievement.find({ id: user });
  }
  return ach[0];
}

async function getUnivInfo(user) {
  let univ = await University.find({ id: user });
  while (
    univ == [] ||
    univ[0] == undefined ||
    univ[0].current_cgpa == undefined
  ) {
    console.log("hi");
    univ = await University.find({ id: user });
  }
  return univ[0];
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
    let skills, info, lang, addInfo, edu, univ, exp, ach;
    handleDb(keys, req, user, newForm)
      .then(async function () {
        await getSkill(req.user).then((skill) => {
          skills = skill;
        });
        await getPersonalInfo(req.user).then(function (infos) {
          // console.log(infos);
          info = infos;
        });
        await getLan(req.user)
          .then(req.user)
          .then(function (lan) {
            lang = lan;
          });
        await getAddInfo(req.user).then((addInfos) => {
          addInfo = addInfos;
        });
        await getUnivInfo(req.user).then(function (univInfo) {
          univ = univInfo;
        });
        await getEduForm(req.user).then((edus) => {
          edu = edus;
        });
        await getExp(req.user).then((exps) => {
          exp = exps;
        });
        await getAch(req.user).then((achive) => {
          ach = achive;
        });
      })
      .then(function () {
        // console.log(info);
        return res.render("_fourth.ejs", {
          skills: skills,
          info: info,
          lang: lang,
          addInfo: addInfo,
          edu: edu,
          univ: univ,
          exp: exp,
          ach: ach,
        });
      });
  });
};
