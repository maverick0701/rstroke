const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Additional_information: {
    type: String,
  },
});
formSchema.statics.clear = async (userId) => {
  additionalInformation.find({ id: userId }, (err, docs) => {
    if (docs) {
      docs.forEach((doc) => {
        additionalInformation.findByIdAndDelete(doc._id, function (err, docs2) {
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
const additionalInformation = mongoose.model(
  "additionalInformation",
  formSchema
);

module.exports = additionalInformation;
