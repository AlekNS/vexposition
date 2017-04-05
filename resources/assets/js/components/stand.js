/**
 * @function StandComponent
 * @name stand
 * @memberOf angular.components
 * @description Stand.
 */
export default function StandComponent () {
  return {
    bindings: {
      stand: '<',
      onButtonClick: '&'
    },
    templateUrl: '/views/components/stand.html',
    controller: function (appConfigs) {
      'ngInject';

      this.freeStandUrl = appConfigs.standFreeImgUrl;
    }
  };
}
