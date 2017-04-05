/**
 * Angular frontend one page application.
 * @namespace angular
 */

//
// Load all common libraries
//
window._ = require('lodash');
window.angular = require('angular');
window.$ = window.jQuery = require('jquery');
window.axios = require('axios');
window.axios.defaults.headers.common = {
  'X-CSRF-TOKEN': _.get(window, 'Laravel.csrfToken'),
  'X-Requested-With': 'XMLHttpRequest'
};

require('bootstrap-sass');

require('angular-resource');
require('angular-messages');
require('angular-cookies');
require('angular-animate');
require('angular-sanitize');
require('angular-route');

require('ng-file-upload');

require('leaflet');
require('angular-simple-logger');
require('ui-leaflet');

//
// Load main application
//
import ApplicationConfigs from './appConfigs';
import ApplicationServicesConfigurator from './appServicesConfig';
import ApplicationRouteConfigurator from './appRoutesConfig';
import ApplicationRun from './appRun';

import InitApplicationServices from './services/';
import InitApplicationComponents from './components/';
import InitApplicationControllers from './controllers/';

ApplicationConfigs();
InitApplicationServices();
InitApplicationComponents();
InitApplicationControllers();

angular.module('vexposition', [
  'ng', 'ngRoute', 'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngResource',
  'vexposition.configs',
  'vexposition.services',
  'vexposition.components',
  'vexposition.controllers',
  'ngFileUpload', 'ui-leaflet',
])
  .config(ApplicationServicesConfigurator)
  .config(ApplicationRouteConfigurator)
  .run(ApplicationRun)
;
