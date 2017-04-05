/**
 * @class alertService
 * @memberOf angular.services
 * @description Alert Service for displaying default dialogs.
 */
export default class AlertService {

  // @TODO: Add modalService for displaying alerts.
  constructor ($q) {
    'ngInject';

    this.$q = $q;
  }

  /**
   * @method alert
   * @memberOf angular.services.alertService
   * @description Show alert dialog
   * @param {string} title
   * @return {Promise}
   */
  alert (title) {
    alert(title);
    return this.$q.resolve(title);
  }

  /**
   * @method confirm
   * @memberOf angular.services.alertService
   * @description Show confirm dialog
   * @param {string} title
   * @return {Promise}
   */
  confirm (title) {
    var result = confirm(title);
    if (result) {
      return this.$q.resolve('yes');
    }
    return this.$q.reject('no');
  }

  /**
   * @method prompt
   * @memberOf angular.services.alertService
   * @description Show prompt dialog
   * @param {string} title
   * @param {string} defaultValue
   * @return {Promise}
   */
  prompt (title, defaultValue) {
    var result = prompt(title, defaultValue);
    if (result) {
      return this.$q.resolve(result);
    }
    return this.$q.reject(defaultValue);
  }

}
