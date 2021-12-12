const express = require("express");
const {
  getUsersByType, postFriendRequest, postAcceptFriend, postDeclineFriend
} = require("../controllers/UsersController");
const authUser = require("../middlewares/authUser");

const router = express.Router();

router.get("/", authUser, async (req, res, next) => {
  const { usersByType, error } = await getUsersByType(req.userId);
  if (error) {
    next(error);
  } else {
    res.status(201).json({
      usersByType: usersByType
    });
  }
});

router.post("/send-request", authUser, async (req, res, next) => {
  const { friendToSendRquest } = req.body;
  const { status, error } = await postFriendRequest(req.userId, friendToSendRquest);
   if (error) {
    next(error);
  } else {
    res.status(201).json({
      response: status
    });
  }
})

router.post("/accept-request", authUser, async (req, res, next) => {
  const { friendToAccept } = req.body;
  const { status, error } = await postAcceptFriend(req.userId, friendToAccept);
   if (error) {
    next(error);
  } else {
    res.status(201).json({
      response: status
    });
  }
})

router.post("/decline-request", authUser, async (req, res, next) => {
  const { friendToDecline } = req.body;
  const { status, error } = await postDeclineFriend(req.userId, friendToDecline);
   if (error) {
    next(error);
  } else {
    res.status(201).json({
      response: status
    });
  }
})

module.exports = router;
