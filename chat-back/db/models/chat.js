const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');

const ChatSchema = new Schema({
  messages: [{
    createdAt: {
      type: Date,
      default: Date.now
    },
    seen: {
      type: Boolean,
      default: false
    },
    text: {type: String, required: true},
    user: {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  users: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Chat = model("Chat", ChatSchema, "chats");

module.exports = Chat;
