const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Title_1: {
    type: String,
  },
  Experience_1: {
    type: String,
  },
  Title_2: {
    type: String,
  },
  Experience_2: {
    type: String,
  },
  Title_3: {
    type: String,
  },
  Experience_3: {
    type: String,
  },
});
formSchema.statics.clear = async (userId) => {
  Experience.find({ id: userId }, (err, docs) => {
    if (docs) {
      docs.forEach((doc) => {
        Experience.findByIdAndDelete(doc._id, function (err, docs2) {
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
const Experience = mongoose.model("Experience", formSchema);

module.exports = Experience;
