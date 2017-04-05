/**
 * @class standService
 * @memberOf angular.services
 * @description Stand Helpful Service.
 */
export default class StandService {

  constructor($location, modalService, standResource, authService) {
    'ngInject';

    this.$location = $location;

    this.modalService = modalService;
    this.standResource = standResource;
    this.authService = authService;
  }

  /**
   * @memberOf angular.services.standService
   * @description Request user data from the server.
   * @param {Array<Object>} stands Stands list
   * @param stand The target stand to be reload (if user auth.)
   * @returns {Promise.<T>}
   */
  cachedLoadStand (stands, stand) {
    var standInCollection = _.find(this.stands, { id: stand.id });

    if (!this.authService.isAuth()) {
      return Promise.resolve(stand);
    }

    return this.standResource.getById({ eventId: stand.event_id, id: stand.id })
      .then((stand) => {
        return _.extend(standInCollection, stand);
      });
  }

  /**
   * Show popup for stand reservation.
   * @param {Object} stand Stand to be booking.
   * @returns {Promise.<T>}
   */
  showFreeStand(stand) {
    return this.modalService.show('/views/modals/standReserve.html', {
      controller: function ($scope, $modal) {
        'ngInject';
        $scope.stand = stand;
        $scope.onClickOk = function () {
          $modal.hide();
        };
      }
    }).then(() => {
      this.$location.path(`/event/${stand.event_id}/stand/${stand.id}/booking`);
    })
    .catch(()=>0);
  }

  /**
   * Show popup for viewing stand details.
   * @param {Object} stand Stand to be displaying.
   * @returns {*}
   */
  showStandDetails(stand) {
    if (!this.authService.isAuth()) {
      return this.authService.showAuth();
    }
    return this.modalService.show('/views/modals/standDetails.html', {
      controller: function ($scope, $modal) {
        'ngInject';
        $scope.stand = stand;
        $scope.onClickOk = function () {
          $modal.hide();
        };
      }
    }).catch(()=>0);
  }

}
