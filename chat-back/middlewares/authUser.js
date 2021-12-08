const jwt = require("jsonwebtoken");
const { generateError } = require("../utils/errors");

const authUsuario = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userInfo.id;
    next();
  } catch (err) {
    return next(generateError(err.message, 403));
  }
};

module.exports = authUsuario;
