const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Achievement: {
    type: String,
  },
});
formSchema.statics.clear = async (userId) => {
  Achievement.find({ id: userId }, (err, docs) => {
    if (docs) {
      docs.forEach((doc) => {
        Achievement.findByIdAndDelete(doc._id, function (err, docs2) {
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
const Achievement = mongoose.model("Achievement", formSchema);

module.exports = Achievement;
