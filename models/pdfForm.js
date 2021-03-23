const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    education: {
      type: Boolean,
      required: true,
    },
    skill: {
      type: Boolean,
      required: true,
    },
    aboutme: {
      type: Boolean,
      required: true,
    },
    profile: {
      type: Boolean,
      required: true,
    },
    achievement: {
      type: Boolean,
      required: true,
    },
    experience: {
      type: Boolean,
      required: true,
    },
    language: {
      type: Boolean,
    },
    project: {
      type: String,
    },
    numTrue: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
