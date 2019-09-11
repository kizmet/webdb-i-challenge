const express = require("express");
const AccountsRouter = require("./data/accounts/accountsRouter.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter);

module.exports = server;
