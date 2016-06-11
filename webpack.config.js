'use strict';

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

const config = {
  entry: [
    './src/main/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/'
  },
  plugins: [
    new CopyWebpackPlugin([ { from: 'src/assets' } ])
  ],
  module: {
    loaders: [ {
      test: /\.js$/,
      loaders: [ 'react-hot', 'babel' ],
      include: path.join(__dirname, 'src/main')
    } ]
  }
}

if (mode === 'development') {
  config.devtool = 'eval';
  config.entry.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
  config.plugins.unshift(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else if (mode === 'production') {
  config.devtool = 'cheap-module-source-map';
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));
}

module.exports = config;
