'use strict';

const chai = require('chai'),
  chaiAsPromised = require('chai-as-promised');

function CustomWorld() {
  chai.use(chaiAsPromised);
  this.chai = chai;
  this.expect = chai.expect;

  this.waitForElement = function(locator) {
    var condition = seleniumWebdriver.until.elementLocated(locator);
    return this.driver.wait(condition)
  };
}

module.exports = function() {
  this.World = CustomWorld;
};
