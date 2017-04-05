import WelcomeCtrl from './welcomeCtrl';
import StandCtrl from './standCtrl';
import BookingCtrl from './bookingCtrl';

/**
 * @namespace angular.controllers
 * @memberOf angular
 */
export default function InitApplicationControllers () {
  angular.module('vexposition.controllers', [
    'ng',
    'vexposition.services'
  ])
    .controller('WelcomeCtrl', WelcomeCtrl)
    .controller('StandCtrl', StandCtrl)
    .controller('BookingCtrl', BookingCtrl)
  ;
}
