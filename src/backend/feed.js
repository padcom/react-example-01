'use strict';

const WebSocketServer = require('ws').Server;
let wss;
let backgroundProcess;

let index = 0;

function feed(data) {
  wss.broadcast(JSON.stringify({ title: 'Hello, world! ' + (++index), data: data.randomize(10) }));
  backgroundProcess = setTimeout(() => feed(data), 1000);
};

function stop() {
  clearTimeout(backgroundProcess);
}

function init(server) {
  wss = new WebSocketServer({ server: server, path: '/events' });
  let clients = [];

  wss.broadcast = function(data) {
    try {
      clients.forEach(client => client.send(data));
    } catch (e) {
      console.log('ERROR: ', e);
    }
  }

  wss.on('connection', function connection(ws) {
    clients.push(ws);
    ws.on('close', function() {
      clients.splice(clients.indexOf(ws), 1);
    });
  });

  return {
    start: feed,
    stop
  }
}

module.exports = { init }
