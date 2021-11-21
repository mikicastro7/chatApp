require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("chatApp:index");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const express = require("express");

const routsAuth = require("./routes/auth")

const {
  generateError, serverError, notFoundError, generalError
} = require("./utils/errors");
require("./db/dbMongo");

const app = express();

const port = process.env.PORT;

const server = app.listen(port, () => {
  debug(chalk.yellow.bold(`Runing on port ${port}`));
});

server.on("error", err => serverError(err, port));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//app.get('/', (req, res) => res.send('Hello World!'))

app.use("/auth", routsAuth);

app.use(notFoundError);
app.use(generalError);
