/**
 * @namespace angular.configs
 * @memberOf angular
 */
export default function InitApplicationServices () {
  angular.module('vexposition.configs', [])
    .constant('appConfigs', {
      'appName': 'VExposition',
      'standFreeImgUrl': '/images/freestand.png',
      'apiUrl': '/api/'
    })
  ;
}
