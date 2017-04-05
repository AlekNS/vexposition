'use strict';

const
  path = require('path'),
  webpack = require('webpack');

module.exports = function makeWebpackConfig () {
  var config = { };

  config.entry = {
    'app': ['./resources/assets/js/app.js']
  };

  config.devtool = 'inline-source-map';

  config.node = {
    fs: 'empty'
  };

  config.module = {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', {
            loader: 'istanbul-instrumenter-loader',
            query: {
                esModules: true
            }
        }]
      }
    ]
  };

  return config;
}();
