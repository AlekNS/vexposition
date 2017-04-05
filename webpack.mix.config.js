'use strict';

const
  webpack = require('webpack'),
  ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

const ENV = process.env.npm_lifecycle_event,
  isProd = ENV === 'build';

module.exports = function makeWebpackConfig () {
  var config = { },
    opts = {
      DEBUG: !isProd
    };

  config.plugins = [
    new ngAnnotatePlugin({
      add: true
    })
  ];

  return config;
}();
