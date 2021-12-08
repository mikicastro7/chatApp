const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  friends: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sent: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  received: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const User = model("User", UserSchema, "users");

module.exports = User;
