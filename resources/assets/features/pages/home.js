'use strict';

module.exports = {
  page: {
    bookYourPlaceBtn: element(by.css('a.btn.btn-block.btn-primary')),
    map: element.all(by.css('div.angular-leaflet-map')),
    eventInfo: element.all(by.css('[data-ng-show]')),
    marker: element(by.css('img.leaflet-marker-icon.leaflet-clickable:first-child'))
  },

  go: function (site) {
    return browser.get(site);
  },

  goSomeEvent: function (site) {
    return browser.get(site)
        .then(() => {
          return this.page.marker.isPresent();
        })
        .then(() => {
          return this.page.marker.click();
        })
        .then(() => {
          return this.page.bookYourPlaceBtn.click();
        });
  },

  selectMarker: function () {
    return this.page.marker.click();
  },

  clickOnBookPlace: function () {
    return this.page.bookYourPlaceBtn.click();
  }
};
