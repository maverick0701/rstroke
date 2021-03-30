const mongoose = require("mongoose");
const { resolve } = require("path");

const formSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    position: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

formSchema.statics.clear = (userId) => {
  personalInfo.find({ id: userId }, (err, docs) => {
    docs.forEach((doc) => {
      personalInfo.findByIdAndDelete(doc._id, function (err, docs2) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted : ");
        }
      });
    });
  });
  return;
};

const personalInfo = mongoose.model("personalInfo", formSchema);

module.exports = personalInfo;
