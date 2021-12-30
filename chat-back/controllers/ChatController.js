require("dotenv").config();
const { generateError } = require("../utils/errors");
const Chat = require("../db/models/chat");
const User = require("../db/models/user");
var ObjectId = require('mongodb').ObjectID;

const getCreateChat = async (userOneId, userTwoId) => {
  const response = {
    chat : "success",
    error: null
  };
  const userOne = await User.findOne(ObjectId(userOneId));
  const userTwo = await User.findOne(ObjectId(userTwoId));

  const existChat = await Chat.findOne({"users": {"$size": 2, "$all": [userOne, userTwo]}}).populate({ path: "users", select: "userName"})

  let newChatBd = null;

  if (!existChat) {
    newChatBd = await Chat.create({
      users: [userOne, userTwo]
    });
    response.chat = {
      chat: newChatBd,
      new: true
    }
  } else {
    response.chat = {
      chat: existChat,
      new: false
    }
  }
  return response;
}

const sendMessage = async (userId, text, chatId) => {
  const response = {
    chat : "success",
    error: null
  };
  const chat = await Chat.findOne(ObjectId(chatId));
  const user = await User.findOne(ObjectId(userId));

  if (!chat.users.some(usersChat => usersChat._id.equals(userId))) {
    const error = generateError("This user is not in this chat", 409);
    response.error = error;
    return response;
  }

  if (!chat) {
    const error = generateError("Chat does not exists", 409);
    response.error = error;
  } else {
    chat.messages.push({
      text: text,
      user: user
    })
    response.chat = chat._id
    chat.save();
  }
  return response;
}

const getChats = async (userId) => {
  const response = {
    chats : null,
    error: null
  };
  const user = await User.findOne(ObjectId(userId));
  const chats = await Chat.find({users: user}).sort('-messages.createdAt').populate({ path: "users", select: "userName"});

  // TODO improve eficiency
  const friendsChats = [];
  const randomChats = [];

  chats.forEach(chat => {
    const userToFindId = chat.users.filter(ChatUser => !ChatUser._id.equals(user._id));
    if (user.friends.find(friend => friend._id.equals(userToFindId[0]._id))) {
      friendsChats.push(chat)
    } else {
      randomChats.push(chat);
    }
  });

  response.chats = {
    randomChats: randomChats,
    friendsChats: friendsChats
  }

  return response;
}

const getChat = async (userId, chatId) => {
  const response = {
    chat: null,
    error: null
  }
  const user = await User.findOne(ObjectId(userId));
  const chat = await Chat.findOne(ObjectId(chatId)).populate({ path: "users", select: "userName"});

  if (chat) {
    if (chat.users.find(user => user._id == user._id)) {
      response.chat = chat;
    } else {
      response.error = generateError("not permited chat", 409);
    }
  } else {
    response.error = generateError("Chat does not exists", 409);
  }

  return response;
}

module.exports = {
  getCreateChat,
  sendMessage,
  getChats,
  getChat
};
