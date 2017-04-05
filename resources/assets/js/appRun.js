export default function ApplicationRun ($rootScope, appConfigs, authService, userService) {
  'ngInject';

    /**
     * Get config value by specified path.
     * @param {string} path Point path
     * @param defaultValue
     * @returns {*}
     */
  $rootScope.getAppConfig = function (path, defaultValue) {
    return _.get(appConfigs, path, defaultValue);
  };

  $rootScope.getCsrfToken = function () {
    return _.get(window, 'Laravel.csrfToken');
  };

  $rootScope.isAuth = function () {
    return authService.isAuth();
  };

  $rootScope.hasRoles = function (...roles) {
    return authService.hasRoles(...roles);
  };

    /**
     * Get current user data field by specified path
     * @param {string} path Point path
     * @param defaultValue
     * @returns {*}
     */
  $rootScope.getUser = function (path, defaultValue) {
    return _.get(userService.getUserData(), path, defaultValue);
  };

}
