/**
* @class
* @memberOf angular.controllers
* @description Stand Controller.
*/
export default class StandCtrl {

  constructor($routeParams, eventResource, standResource, standService) {
    'ngInject';

    this.eventId = $routeParams.eventId;

    this.standService = standService;
    this.eventResource = eventResource;
    this.standResource = standResource;

    this.stands = [];
    this.loadEvent(this.eventId);
    this.loadAllStands(this.eventId);
  }

  loadEvent (eventId) {
    this.eventResource.getById({ id: eventId })
      .then((event) => this.event = event);
  }

  loadAllStands (eventId) {
    this.standResource.getAll({ eventId: eventId })
      .then((stands) => { this.stands = stands.rows; });
  }

  onStandClick (stand) {
    this.selectedStand = stand;
    return this.standService.cachedLoadStand(this.stands, stand).then((stand) => {
      if (stand.price) {
        return this.standService.showFreeStand(stand);
      }
      return this.standService.showStandDetails(stand);
    });
  }

}
