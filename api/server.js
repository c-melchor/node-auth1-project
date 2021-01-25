const express = require("express");
const server = express();
const UsersRouter = require("./users/users-router");

server.use(express.json());
server.use("/api/users", UsersRouter);

module.exports = server;
