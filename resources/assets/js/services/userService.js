/**
 * @class userService
 * @memberOf angular.services
 * @description User Service.
 */
export default class UserService {

  constructor ($http, appConfigs) {
    'ngInject';

    this.$http = $http;
    this.appConfigs = appConfigs;

    this.userData = {};
  }

  /**
   * @method loadUserData
   * @memberOf angular.services.userService
   * @description Request user data from the server.
   * @return {bool} [isNeedReload] Force request.
   * @return {Promise}
   */
  loadUserData (isNeedReload) {
    if (!isNeedReload && this.userData.id) {
      return Promise.resolve(this.userData);
    }

    return this.$http.get(this.appConfigs.apiUrl + 'user').then((response) => {
      return this.userData = response.data;
    }, () => {
      return this.userData = {};
    });
  }

  /**
   * @method getUserData
   * @memberOf angular.services.userService
   * @description Get current user data.
   * @return {object}
   */
  getUserData () {
    return this.userData;
  }

}
