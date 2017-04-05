/**
 * @class authService
 * @memberOf angular.services
 * @description Auth-tion Service.
 */
export default class AuthService {

  constructor (userService, $http, modalService) {
    'ngInject';

    this.userService = userService;
    this.$http = $http;
    this.modalService = modalService;
  }

  /**
   * @method isAuth
   * @memberOf angular.services.authService
   * @description Check, if user currently authorized.
   * @return {bool}
   */
  isAuth () {
    return !!this.userService.getUserData().id;
  }

  /**
   * @method hasRole
   * @memberOf angular.services.authService
   * @description Check, if user has role.
   * @param {string[]} roles Checking roles
   * @return {bool}
   */
  hasRoles (...roles) {
    return this.userService.getUserData().roles && !roles.some((role) => {
      return !this.userService.getUserData().roles.includes(role);
    }) || false;
  }

  /**
   * Show authentification popup for user.
   * @returns {*}
   */
  showAuth () {
    return this.showSignIn();
  }

  _markFormDirty (form) {
    _.forEach(form && form.$$controls, (c) => {
      c.$setDirty();
    });
  }

  /**
   * Show sign in popup.
   * @returns {promise.Promise<R>|Promise<number>|Promise<R>|Promise.<T>|*}
   */
  showSignIn () {
    // @TODO: DRY
    return this.modalService.show('/views/modals/signin.html', {
      controller: ($scope, $modal, $route) => {
        'ngInject';

        $scope.model = {};

        $scope.onSignUpClick = () => {
          $modal.hide().then(() => {
            return this.showSignUp();
          });
        };

        $scope.onSubmitForm = (form) => {
          $scope.errors = [];
          this._markFormDirty(form);
          if (form.$invalid) {
            return;
          }

          this.$http.post('/login', $scope.model).then(() => {
            this.userService.loadUserData();
            $route.reload();
            $modal.hide();
          }, (response) => {
            $scope.errors = _.values(response.data);
          });
        };
      }
    }).catch(()=>0);
  }

  /**
   * Show sign up popup.
   * @returns {promise.Promise<R>|Promise<number>|Promise<R>|Promise.<T>|*}
   */
  showSignUp () {
    // @TODO: DRY
    return this.modalService.show('/views/modals/signup.html', {
      controller: ($scope, $modal, $route) => {
        'ngInject';

        $scope.model = {};

        $scope.onSignInClick = () => {
          $modal.hide().then(() => {
            return this.showSignIn();
          });
        };

        $scope.onSubmitForm = (form) => {
          $scope.errors = [];
          this._markFormDirty(form);
          if (form.$invalid) {
            return;
          }

          $scope.model.password_confirmation = $scope.model.password;
          this.$http.post('/register', $scope.model).then(() => {
            this.userService.loadUserData();
            $route.reload();
            $modal.hide();
          }, (response) => {
            $scope.errors = [response.data.error];
          });
        };
      }
    }).catch(()=>0);
  }

}
