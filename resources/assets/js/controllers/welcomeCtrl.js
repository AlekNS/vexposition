/**
* @class
* @memberOf angular.controllers
* @description Welcome Controller.
*/
export default class WelcomeCtrl {

  constructor(eventResource) {
    'ngInject';

    this.eventResource = eventResource;

    this.loadEvents();
  }

  loadEvents() {
    this.eventResource.getAll().then((result) => {
      this.events = result.rows;
    });
  }

  onEventClick(event) {
    this.selectedEvent = event;
  }
}
