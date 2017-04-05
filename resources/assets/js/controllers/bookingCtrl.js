/**
* @class
* @memberOf angular.controllers
* @description Booking Controller.
*/
export default class BookingCtrl {

  constructor($routeParams, modalService, eventResource, standResource, alertService, apiService, $location) {
    'ngInject';

    this.eventId = $routeParams.eventId;
    this.standId = $routeParams.standId;

    this.$location = $location;
    this.alertService = alertService;
    this.modalService = modalService;
    this.eventResource = eventResource;
    this.standResource = standResource;
    this.apiService = apiService;

    this.stands = [];
    this.model = {};

    this.loadEvent(this.eventId);
    this.loadStand(this.eventId, this.standId);

  }

  loadEvent (eventId) {
    this.eventResource.getById({ id: eventId })
      .then((event) => this.event = event);
  }

  loadStand (eventId, standId) {
    this.standResource.getAll({ eventId: eventId, id: standId })
      .then((stand) => { this.stand = stand; });
  }

  onSubmitForm (form) {
    if (form.$invalid || !this.model.logo_url || !this.model.file_url) {
      return;
    }

    this.apiService.bookingStand(this.standId, this.model).then(() => {
      this.$location.path(`/event/${this.eventId}/stand`);
    }, (response) => {
      this.alertService.alert(_.get(response, 'data.error'), 'Server error was occured!');
    });
  } 

  // @TODO: DRY principle
  uploadLogo (file) {
    if (!file) {
      return;
    }

    this.model.logo_url = false;
    return this.apiService.uploadImage(file, true).then((resp) => {
      this.model.logo_url = resp.data.file_name;
    }, (resp) => {
      this.alertService.alert(resp.status);
    });
  } 

  // @TODO: DRY principle
  uploadFile (file) {
    if (!file) {
      return;
    }

    this.model.file_url = false;
    return this.apiService.uploadFile(file).then((resp) => {
      this.model.file_url = resp.data.file_name;
    }, (resp) => {
      this.alertService.alert(resp.status);
    });
  } 
}
