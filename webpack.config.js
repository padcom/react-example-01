'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

const config = {
  entry: {
    app: [
      './src/main/javascript/index',
      './src/main/styles/index.less'
    ],
    vendor: [
      'react', 'react-dom', 'react-redux', 'redux', 'redux-thunk', 'lodash',
      'html-entities', 'ansi-html', 'ansi-regex', 'querystring', 'strip-ansi'
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    publicPath: '/'
  },
  plugins: [
    new CopyWebpackPlugin([ { from: 'src/assets' } ]),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", Infinity)
  ],
  module: {
    loaders: [ {
      test: /\.js$/,
      loaders: [ 'react-hot', 'babel' ],
      include: __dirname + '/src/main/javascript'
    }, {
      test: /\.less$/,
      loaders: [ 'style', 'css', 'less' ],
      include: __dirname + '/src/main/styles'
    }, {
      test: /\.(gif|png|jpg|jpeg|svg)($|\?)/,
      loaders: [ 'url?limit=5000&hash=sha512&digest=hex&size=16&name=resources/[name]-[hash].[ext]' ],
      include: __dirname + '/src/main/assets'
    } ]
  },
}

if (mode === 'development') {
  config.devtool = 'eval-source-map';
  config.entry.app.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
  config.entry.vendor.push('react-hot-loader', 'react-hot-api');
  config.plugins.unshift(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

if (mode === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  );
}

module.exports = config;
