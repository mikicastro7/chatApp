require("dotenv").config();
const jwt = require("jsonwebtoken");
const { generateError } = require("../utils/errors");
const User = require("../db/models/user");


const registerUser = async newUser => {
  console.log(newUser);
  const response = {
    user: null,
    error: null
  };
  const userFound = await User.findOne({
    userName: newUser.userName
  });
  if (userFound) {
    const error = generateError("User exists", 409);
    response.error = error;
  } else {
    const newUserBD = await User.create(newUser);
    const token = jwt.sign({
      id: newUserBD._id,
      user: newUserBD.userName,
    }, process.env.JWT_SECRET, {
      expiresIn: "30d"
    });
    response.user = token;
  }
  return response;
};

const loginUser = async (userName, password) => {
  const userFound = await User.findOne({
    userName,
    password
  });
  const response = {
    error: null,
    usuario: null
  };
  if (!userFound) {
    response.error = generateError("Bad credentials", 403);
  } else {
    const token = jwt.sign({
      id: userFound._id,
      user: userFound.userName,
    }, process.env.JWT_SECRET, {
      expiresIn: "30d"
    });
    response.user = token;
  }
  return response;
};

module.exports = {
  registerUser,
  loginUser
};
