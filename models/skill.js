const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  skill_1: {
    type: String,
  },
  skill_2: {
    type: String,
  },
  skill_3: {
    type: String,
  },
  skill_4: {
    type: String,
  },
  skill_5: {
    type: String,
  },
  skill_6: {
    type: String,
  },
  skill_7: {
    type: String,
  },
});
formSchema.statics.clear = async (userId) => {
  skillForm.find({ id: userId }, (err, docs) => {
    if (docs) {
      docs.forEach((doc) => {
        skillForm.findByIdAndDelete(doc._id, function (err, docs2) {
          if (err) {
            console.log(err);
          } else {
            // console.log("Deleted : ");
          }
        });
      });
    } else {
      return;
    }
  });
  return;
};
const skillForm = mongoose.model("skillForm", formSchema);

module.exports = skillForm;
