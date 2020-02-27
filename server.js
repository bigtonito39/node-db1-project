const express = require('express');
const welcomeRouter = require('./Welcome/welcome-router')
const accountsRouter = require('./accounts/accountsRouter')

const server = express();

server.use(express.json());


server.use("/", welcomeRouter)
server.use("/accounts",accountsRouter )

module.exports = server;