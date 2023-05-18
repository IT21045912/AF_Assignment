const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    RegNo: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact_number: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
    },
    role: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
