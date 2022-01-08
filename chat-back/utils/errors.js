const chalk = require("chalk");
const debug = require("debug");
const { validationResult } = require("express-validator");

const generateError = (message, status) => {
  const error = new Error(message);
  error.code = status;
  return error;
};
const serverError = (err, port) => {
  debug(chalk.red.bold("server error"));
  if (err.code === "EADDRINUSE") {
    debug(chalk.red.bold(`port in use ${port}.`));
  }
};
const notFoundError = (req, res, next) => {
  const error = generateError("not found", 404);
  next(error);
};

const generalError = (err, req, res, next) => {
  const error = {
    code: err.code || 500,
    message: err.code ? err.message : "general error"
  };
  res.status(error.code).json({ error: true, message: error.message });
};

module.exports = {
  generateError,
  serverError,
  notFoundError,
  generalError
};
