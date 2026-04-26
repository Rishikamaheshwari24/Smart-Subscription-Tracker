const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email: email.trim(),
    password: password.trim()
  });

  await user.save();

  res.json({ message: "User ban gaya" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User nahi mila" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Galat password hai" });
  }

  res.json({ token: user._id });
});
module.exports = router;