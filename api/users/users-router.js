const express = require("express");
const Users = require("./users.model");
const router = express.Router();

router.get("/", (req, res) => {
  Users.getAll()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
