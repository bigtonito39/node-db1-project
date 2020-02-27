const server = require('./server.js');
const welcomeRouter = require('./Welcome/welcome-router')

const PORT = process.env.PORT || 4000;

server.use("/", welcomeRouter)



server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});