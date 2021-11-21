const mongoose = require("mongoose");
require("dotenv").config();
const debug = require("debug")("chatApp:dbMongo");
const chalk = require("chalk");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, err => {
  if (err) {
    debug(chalk.red("Coultn't connect"));
    debug(chalk.red(err));
  }
  debug(chalk.green("MongoDB iniciated"));
});