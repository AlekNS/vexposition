'use strict';

const home = require('../pages/home.js');

module.exports = function () {
  this.Given(/^I go to "([^"]*)"$/, function (site) {
    home.go(site);
  });

  this.When(/^I see map$/, function (callback) {
    this.expect(home.page.map.isPresent()).to.eventually.equal(true).and.notify(callback);
  });

  this.When(/^I see markers on the map$/, function (callback) {
    this.expect(home.page.marker.isPresent()).to.eventually.equal(true).and.notify(callback);
  });

  this.Then(/^Button "([^"]*)" should be diactivated$/, function (buttonTitle, callback) {
    this.expect(home.page.bookYourPlaceBtn.getText()).to.eventually.equal(buttonTitle).and.notify(callback);
    this.expect(home.page.bookYourPlaceBtn.getAttribute('class')).to.eventually.contains('disabled').and.notify(callback);
  });

  this.When(/^I click any marker$/, function () {
    return home.selectMarker();
  });

  this.Then(/^I should see Event Information$/, function (callback) {
    this.expect(home.page.eventInfo.getText()).to.eventually.not.equal('').and.notify(callback);
  });

  this.Then(/^"([^"]*)" button should be activated$/, function (buttonTitle, callback) {
    this.expect(home.page.bookYourPlaceBtn.getText()).to.eventually.equal(buttonTitle).and.notify(callback);
    this.expect(home.page.bookYourPlaceBtn.getAttribute('class')).to.eventually.not.contains('disabled').and.notify(callback);
  });
};
