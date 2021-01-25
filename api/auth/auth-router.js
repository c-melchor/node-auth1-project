const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../users/users.model");

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  Users.add({ username, password: hashed })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const validUser = Users.findBy({ username });
  if (validUser && bcrypt.compareSync(password, validUser.password)) {
    req.session.user = validUser;
    res.json("Welcome Back!");
  } else if (!validUser) {
    res.status(401).json({ errorMessage: error.message });
  } else {
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;
