import BaseResourceService from './baseResourceService';

/**
 * Exposition event resource.
 */
export default class EventResourceService extends BaseResourceService {
  constructor($log, alertService, appConfigs, $resource) {
    'ngInject';

    super($log, alertService, appConfigs);
    this.resource = $resource(this.restEndpoint + 'event/:id', { id: '@id' });
  }
}
