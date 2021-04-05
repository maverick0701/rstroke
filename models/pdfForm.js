const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  Personal_Information: {
    type: Array,
  },
  Education: {
    type: Array,
  },
  University: {
    type: Array,
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
