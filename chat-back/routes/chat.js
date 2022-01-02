const express = require("express");
const {
  getCreateChat, sendMessage, getChats, getChat
} = require("../controllers/ChatController");
const authUser = require("../middlewares/authUser");

const router = express.Router();

router.post("/new/", authUser, async (req, res, next) => {
  const { chatWith } = req.body;
  const { chat, error } = await getCreateChat(req.userId, chatWith);
   if (error) {
    next(error);
  } else {
    res.status(201).json({
      status: "success",
      chat: chat
    });
  }
})

router.post("/new-message", authUser, async (req, res, next) => {
  const { text, chatId } = req.body;
  const { message, error } = await sendMessage(req.userId, text, chatId);
   if (error) {
    next(error);
  } else {
    res.status(201).json({
      status: "success",
      message: message
    });
  }
})

router.get("/", authUser, async (req, res, next) => {
  const { chats, error } = await getChats(req.userId);
   if (error) {
    next(error);
  } else {
    res.status(201).json({
      status: "success",
      chats: chats
    });
  }
})

router.get("/:chatId", authUser, async (req, res, next) => {
  const { chat, error } = await getChat(req.userId, req.params.chatId);
  if (error) {
    next(error);
  } else {
    res.status(201).json({
      status: "success",
      chat: chat
    });
  }
})


module.exports = router;
