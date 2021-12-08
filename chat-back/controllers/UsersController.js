require("dotenv").config();
const { generateError } = require("../utils/errors");
const User = require("../db/models/user");
var ObjectId = require('mongodb').ObjectID;

const getUsersByType = async (userId) => {
  const user = await User.findOne(ObjectId(userId))
  .populate({ path: "friends", select: "userName"})
  .populate({ path: "received", select: "userName"})
  .populate({ path: "sent", select: "userName"});

  const notUserIds = [userId, ...user.friends.map(friend => friend._id),
    ...user.sent.map(friend => friend._id),
    ...user.received.map(friend => friend._id)
  ];

  const users = await User.find( { _id: { $nin: notUserIds } } ).select("userName");

  const response = {
    usersByType: {
      friends: user.friends,
      sent: user.sent,
      received: user.received,
      users: users
    },
    error: null
  };

  return response
}


const postFriendRequest = async (userId, friendToSendRquestId) => {
  const userFrom = await User.findOne(ObjectId(userId));
  const userTo = await User.findOne(ObjectId(friendToSendRquestId));
  const response = {
    status : "success",
    error: null
  };
  if (userFrom.sent.some(request => request.equals(userTo._id))) {
    response.error = true
    return response;
  }
  userFrom.sent.push(userTo);
  userFrom.save();
  userTo.received.push(userFrom);
  userTo.save();
  return response;
}

const postAcceptFriend = async (userId, friendToAcceptId) => {
  const userFrom = await User.findOne(ObjectId(userId));
  const friendToAccept = await User.findOne(ObjectId(friendToAcceptId));
  const response = {
    status : "success",
    error: null
  };
  if (userFrom.received.some(request => request.equals(friendToAccept._id))) {
    userFrom.received.pull({_id: friendToAccept._id})
    friendToAccept.sent.pull({_id: userFrom._id})
  } else {
    response.error = true
    return response;
  }
  userFrom.friends.push(friendToAccept);
  userFrom.save();
  friendToAccept.friends.push(userFrom);
  friendToAccept.save();
  return response;
}

module.exports = {
  getUsersByType,
  postFriendRequest,
  postAcceptFriend
};
