'use strict';

const stands = require('../pages/stands.js');

module.exports = function () {
  this.Given(/^I go to some event in "([^"]*)"$/, function (site) {
    return stands.go(site);
  });

  this.When(/^I see "([^"]*)" stand$/, function (standType, callback) {
    this.expect(stands.page[standType == 'free' ?
      'greenButtons' : 'primaryButtons'].count()).to.eventually.not.equal(0).and.notify(callback);
  });

  this.When(/^Stand button "([^"]*)" was clicked$/, function (buttonText) {
    var btnsType = buttonText == 'Book Now' ? 'greenButtons' : 'primaryButtons';
    return stands.page[btnsType].first().click().then(() => browser.sleep('1000'));
  });

  this.Then(/^"([^"]*)" popup should be displayed$/, function (title, callback) {
    this.expect(stands.page.modalHeader.getText()).to.eventually.contains(title).and.notify(callback);
  });
};
