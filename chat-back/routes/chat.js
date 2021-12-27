const express = require("express");
const {
  getChat, sendMessage, getChats
} = require("../controllers/ChatController");
const authUser = require("../middlewares/authUser");

const router = express.Router();

router

router.post("/chat/", authUser, async (req, res, next) => {
  const { chatWith } = req.body;
  const { chat, error } = await getChat(req.userId, chatWith);
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
  const { chat, error } = await sendMessage(req.userId, text, chatId);
   if (error) {
    next(error);
  } else {
    res.status(201).json({
      status: "success",
      chat: chat
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


module.exports = router;
