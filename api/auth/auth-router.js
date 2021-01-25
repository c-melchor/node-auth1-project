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

module.exports = router;
