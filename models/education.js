const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  school_name: {
    type: String,
  },
  end_date: {
    type: String,
  },
  degree_name: {
    type: String,
  },
  cgpa: {
    type: String,
  },
});
formSchema.statics.clear = async (userId) => {
  educationForm.find({ id: userId }, (err, docs) => {
    if (docs) {
      docs.forEach((doc) => {
        educationForm.findByIdAndDelete(doc._id, function (err, docs2) {
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
const educationForm = mongoose.model("educationForm", formSchema);

module.exports = educationForm;
