'use strict';

const path = require('path');
const merge = require('lodash').merge;
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

const config = {
  entry: [
    './src/main/index',
    './src/main/index.less'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    publicPath: '/'
  },
  plugins: [
    new CopyWebpackPlugin([ { from: 'src/main/index.html' } ])
  ],
  module: {
    loaders: [ {
      test: /\.js$/,
      loaders: [ 'react-hot', 'babel' ],
      include: [ __dirname + '/src/main', __dirname + '/src/test' ]
    }, {
      test: /\.less$/,
      loaders: [ 'style', 'css', 'less' ],
      include: __dirname + '/src/main'
    }, {
      test: /\.(gif|png|jpg|jpeg|svg)($|\?)/,
      loaders: [ 'url?limit=5000&hash=sha512&digest=hex&size=16&name=resources/[name]-[hash].[ext]' ],
      include: __dirname + '/src/main'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    } ]
  },
  resolve: {
    root: [ path.resolve('./src/main'), path.resolve('./node_modules') ],
    extensions: [ '', '.js' ]
  },
  externals: {
  }
}

switch(mode) {
  case 'development':
    config.devtool = 'eval-source-map'
    config.entry.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
    config.plugins.push(
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    );

  case 'test':
    // Make sure we have DOM available for intermediate rendering
    const jsdom = require('jsdom');
    const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.document = doc;
    global.window = doc.defaultView;
    global.navigator = {
      userAgent: 'node.js'
    };

    // Make sure we have all the required imports available
    global.React = require('react');
    global.expect = require('chai').expect;
    const enzyme = require('enzyme');
    global.mount = enzyme.mount;
    global.shallow = enzyme.shallow;
    global.render = enzyme.render;

    config.plugins.push(
      new webpack.IgnorePlugin(/jsdom$/),
      new webpack.IgnorePlugin(/node-fetch$/)
    );
    config.externals['react/addons'] = true;
    config.externals['react/lib/ExecutionEnvironment'] = true;
    config.externals['react/lib/ReactContext'] = 'window';

  case 'production':
    config.plugins.push(
      new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    );
}

module.exports = config;
