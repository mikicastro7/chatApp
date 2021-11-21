const express = require("express");
const {
  registerUser,
  loginUser
} = require("../controllers/AuthController");

const { notFoundError } = require("../utils/errors");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const newUser = req.body;
  const { user, error } = await registerUser(newUser);
  if (error) {
    next(error);
  } else {
    res.status(201).json({
      token: user
    });
  }
});

router.post("/login", async (req, res, next) => {
  const { userName, password } = req.body;
  const { error, user } = await loginUser(userName, password);
  if (error) {
    next(error);
  } else {
    res.json({ token: user });
  }
});

module.exports = router;
