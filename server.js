const express = require('express');
const welcomeRouter = require('./Welcome/welcome-router')

const server = express();

server.use(express.json());


server.use("/", welcomeRouter)

module.exports = server;