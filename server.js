const server = require('http').createServer();
const express = require('express');
const app = express();
const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

// webpack with hot reloading
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true, modules: false, chunks: false, timings: true }
}));
app.use(require('webpack-hot-middleware')(compiler, {
  reload: true
}));

// application
const data = require('./src/backend/data').init(15, 10);
const api = require('./src/backend/api');
const feed = require('./src/backend/feed').init(server);

app.use(api.cors);
app.get('/data', api.handler(data.data));
app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/src/main/index.html');
});
// entry point and static content
app.use(express.static('src/main'));

// start the server
server.on('request', app);

server.listen(3000, function(err, result) {
  feed.start(data);
  console.log('Listening at http://localhost:3000/');
});
