const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  Personal_Information: {
    type: Array,
    unique: true,
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
