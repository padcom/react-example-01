'use strict';

var server = require('http').createServer();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server, path: '/events' });
var express = require('express');

// Global server state
const colcount = 25;
const rowcount = 20;
const data = initializeData(colcount, rowcount);
var index = 0;

// WebSocket definiton

var clients = [];

wss.broadcast = function(data) {
  try {
    clients.forEach(client => client.send(data));
  } catch (e) {
  }
}

wss.on('connection', function connection(ws) {
  clients.push(ws);
  ws.on('close', function() {
    clients.splice(clients.indexOf(ws), 1);
  });
});


// RESTful backend definition

var app = express();

server.on('request', app);

function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(cors);

app.get('/data', function(request, response) {
  response.json(data);
})


// Background process definition

var backgroundProcess;

function randomNumber() {
  return Math.round(Math.random() * 999) + 1;
}

function initializeData(colcount, rowcount) {
  var rows = [];
  for (let y = 0; y < rowcount; y++) {
    let columns = [];
    for (let x = 0; x < colcount; x++) {
      columns.push(randomNumber());
    }
    rows.push(columns);
  }

  return rows;
}

function calculateRandomNumbers(count) {
  let modifiedCells = []

  for (let i = 0; i < count; i++) {
    let x = Math.floor(Math.random() * colcount);
    let y = Math.floor(Math.random() * rowcount);
    modifiedCells.push({ x, y, value: randomNumber() });
  }

  return modifiedCells;
}

function feed() {
  wss.broadcast(JSON.stringify({ title: 'Hello, world! ' + (++index), data: calculateRandomNumbers((index % 50) + 1) }));
  backgroundProcess = setTimeout(feed, 150);
};


module.exports = {
  server,
  start: function(port, callback) {
    server.listen(port, callback);
    feed();
  },
  stop: function(callback) {
    clearTimeout(backgroundProcess);
    wss.close(function() { console.log("1"); server.close(callback); });
  }
}
