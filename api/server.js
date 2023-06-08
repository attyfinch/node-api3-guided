const express = require('express'); // importing a CommonJS module
const morgan = require('morgan')
const hubsRouter = require('./hubs/hubs-router.js');
const server = express();


function braDev(req, res, next) {
  console.log(`Hello! you made a ${req.method} request`)
  next();
}

function noNext(req, res, next) {
  res.json("middleware stops working....NOW!")
}

function addFriend(req, res, next) {
  req.friend = "Lady Gaga";
  next();
}



server.use(express.json());
// server.use(noNext)
server.use(morgan('dev'))
server.use(braDev)
server.use(addFriend)




server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Hubs API</h2>
    <p>Welcome to the Hubs API, friend of ${req.friend}</p>
  `);
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

module.exports = server;
