/**
 * Clas to share base resources code.
 */
export default class BaseResourceService {
  constructor($log, alertService, appConfigs) {
    this.$log = $log;
    this.alertService = alertService;
    this.restEndpoint = appConfigs.apiUrl + 'resource/';
  }

  _processCatchPromise(promise) {
    return promise.catch((reason) => {
      this.$log.error(reason);
      return this.alertService.alert(_.get(reason, 'data.error', 'Error was occurred on the server!'))
        .then(() => {
          return Promise.reject(reason);
        });
    });
  }

  getById(params) {
    return this._processCatchPromise(this.resource.get(params).$promise);
  }

  getAll(params) {
    return this._processCatchPromise(this.resource.index(params).$promise);
  }
}
