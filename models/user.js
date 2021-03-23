const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");
// const userSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     avatar: {
//       type: String,
//     },
//     education: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "eduForm",
//       },
//     ],
//     abMe: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "meForm",
//     },
//     experience: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "expForm",
//     },
//     profile: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "proForm",
//     },
//     achievement: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "achForm",
//     },
//     skill: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "skillForm",
//     },
//     project: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "projForm",
//       },
//     ],
//     language: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "lanForm",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    education: [
      {
        type: String,
      },
    ],
    skill: [
      {
        type: String,
      },
    ],
    aboutme: {
      type: String,
    },
    experience: {
      type: String,
    },
    profile: {
      type: String,
    },
    achievement: {
      type: String,
    },
    project: [
      {
        type: String,
      },
    ],
    language: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
//for statics
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
userSchema.statics.avatarPath = AVATAR_PATH;
userSchema.statics.splashUser = (user) => {
  var i = 0;
  user.education.length = 0;
  user.language.length = 0;
  user.project.length = 0;
  user.save().then(() => {
    // console.log(user);
    return;
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
