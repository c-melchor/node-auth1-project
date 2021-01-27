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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const validUser = await Users.findBy({ username }).first();
    if (validUser && bcrypt.compareSync(password, validUser.password)) {
      console.log(req.session, "SESSION");
      req.session.user = validUser;
      res.json("Welcome Back!");
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
