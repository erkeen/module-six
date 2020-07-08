const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  dateOfBirth: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  professions: Array,
});

module.exports = mongoose.model("Student", StudentSchema);
