import AlertService from './alertService';
import ModalService from './modalService';
import AuthService from './authService';
import UserService from './userService';
import ApiService from './apiService';
import StandService from './standService';

import EventResourceService from './resources/eventResourceService';
import StandResourceService from './resources/standResourceService';

/**
 * @namespace angular.services
 * @memberOf angular
 */
export default function InitApplicationServices () {
  angular.module('vexposition.services', [
    'ng', 'ngFileUpload',
  ])
    .service('authService', AuthService)
    .service('userService', UserService)
    .service('apiService', ApiService)
    .service('alertService', AlertService)
    .service('modalService', ModalService)
    .service('standService', StandService)

    .service('eventResource', EventResourceService)
    .service('standResource', StandResourceService)
  ;
}
