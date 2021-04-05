const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  language_1: {
    type: String,
  },
  language_2: {
    type: String,
  },
  language_3: {
    type: String,
  },
});
formSchema.statics.clear = async (userId) => {
  languageForm.find({ id: userId }, (err, docs) => {
    if (docs) {
      docs.forEach((doc) => {
        languageForm.findByIdAndDelete(doc._id, function (err, docs2) {
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
const languageForm = mongoose.model("languageForm", formSchema);

module.exports = languageForm;
