const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  university_name: {
    type: String,
  },
  programme_start: {
    type: String,
  },
  programme_end: {
    type: String,
  },
  programme_name: {
    type: String,
  },
  current_cgpa: {
    type: String,
  },
});
formSchema.statics.clear = async (userId) => {
  universityForm.find({ id: userId }, (err, docs) => {
    if (docs) {
      docs.forEach((doc) => {
        universityForm.findByIdAndDelete(doc._id, function (err, docs2) {
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
const universityForm = mongoose.model("universityForm", formSchema);

module.exports = universityForm;
