exports.config = {
  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    browserName: 'chrome'
  },
//  capabilities: {
//    'browserName': 'phantomjs',
//    'phantomjs.binary.path': require('phantomjs-prebuilt').path,
//    'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG'],
//  },
  framework: 'custom',
  specs: [
    'resources/assets/features/*.feature'
  ],
  baseURL: 'http://localhost/',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    keepAlive: false,
    require: [
      'resources/assets/features/support/env.js',
      'resources/assets/features/support/world.js',
      'resources/assets/features/step_definitions/*.js'
    ],
    tags: false,
    format: 'pretty',
    profile: false,
    'no-source': true
  }
};
