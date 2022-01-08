require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("chatApp:index");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const express = require("express");
const io = require("socket.io")(5001, { cors: {
    origin: "http://localhost:3000"
  }
});

const routesAuth = require("./routes/auth");
const routesUsers = require("./routes/users");
const routesChat = require("./routes/chat");

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

io.sockets.on('connection', function(socket) {
    socket.on("send-message", (message, room) => {
      socket.to(room).emit("recive-message", message, room);
    })
    socket.on("join-room", room => {
      socket.join(room);
    })
});

app.use("/auth", routesAuth);
app.use("/users", routesUsers);
app.use("/chat", routesChat);

app.use(notFoundError);
app.use(generalError);
