import StandComponent from './stand';
import StandCollectionComponent from './standCollection';
import NavBarComponent from './navbar';
import MapComponent from './map';
import DisplayAlertMessagesComponent from './displayAlertMessages';

/**
 * @namespace angular.components
 * @memberOf angular
 */
export default function InitApplicationComponents () {
  angular.module('vexposition.components', [
    'ng'
  ])
    .component('navBar', NavBarComponent())
    .component('map', MapComponent())
    .component('stand', StandComponent())
    .component('standCollection', StandCollectionComponent())
    .component('displayAlertMessages', DisplayAlertMessagesComponent())
  ;
}
