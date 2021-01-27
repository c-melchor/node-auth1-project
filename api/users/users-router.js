const express = require("express");
const Users = require("./users.model");
const router = express.Router();
const security = require("../auth/auth-middleware");

router.get("/", security, (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
