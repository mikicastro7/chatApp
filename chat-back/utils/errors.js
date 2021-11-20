const chalk = require("chalk");
const { validationResult } = require("express-validator");

const generateError = (message, status) => {
  const error = new Error(message);
  error.code = status;
  return error;
};
const serverError = (err, port) => {
  debug(chalk.red.bold("server error"));
  if (err.code === "EADDRINUSE") {
    debug(chalk.red.bold(`port in use ${puerto}.`));
  }
};
const notFoundError = (req, res, next) => {
  const error = generaError("not found", 404);
};

const generalError = (err, req, res, next) => {
  const error = {
    code: err.code || 500,
    message: err.code ? err.message : "general error"
  };
  res.status(error.code).json({ error: true, message: error.message });
  console.log(err);
};

module.exports = {
  generalError,
  serverError,
  notFoundError,
  generalError
};