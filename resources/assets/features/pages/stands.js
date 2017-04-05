'use strict';

const home = require('./home');

module.exports = {
  page: {
    greenButtons: element.all(by.css('button.btn.btn-success')),
    primaryButtons: element.all(by.css('button.btn.btn-primary')),
    modalHeader: element(by.css('div.modal-header'))
  },

  go: function (site) {
    return home.goSomeEvent(site);
  }
};
