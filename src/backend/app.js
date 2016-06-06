var server = require('http').createServer();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server, path: '/events' });

// WebSocket definiton
var clients = [];

wss.broadcast = function(data) {
  clients.forEach(client => client.send(data));
}

wss.on('connection', function connection(ws) {
  clients.push(ws);
  ws.on('close', function() {
    clients.splice(clients.indexOf(ws), 1);
  });
});


// Background process definition
var index = 0;
var backgroundProcess;

function feed() {
  wss.broadcast(JSON.stringify({ title: 'Hello, world! ' + (++index), dataChangeCount: (index % 50) + 1 }));
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
    wss.close(function() { server.close(callback); });
  }
}
