var webpackConfig = require('./webpack.karma.config.js');

module.exports = function(config) {
  config.set({
    captureTimeout: 5000,

    basePath: '',
    frameworks: ['jasmine'],

//    customLaunchers: {
//      Chrome_without_security: {
//        base: 'Chrome',
//        flags: ['--disable-web-security']
//      }
//    },

    browsers: ['PhantomJS'],
    phantomjsLauncher: {
      exitOnResourceError: true
    },

    client: {
      captureConsole: true
    },

    reporters: ['progress'].concat(config.coverage ? ['coverage'] : []),
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    autoWatch: true,
    singleRun: false,
    autoWatchBatchDelay: 300,

    files: [
      './resources/assets/js/**/*.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './resources/assets/tests/**/*.js'],

    preprocessors: {
      './resources/assets/js/**/*.js': ['webpack'],
      './resources/assets/tests/**/*.js': ['babel']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    webpackServer: {
      noInfo: true
    },

    coverageReporter: {
      instrumenterOptions: {
        istanbul: { noCompact: true }
      },
      type : 'html',
      dir : 'coverage/frontend'
    }
  });
}
