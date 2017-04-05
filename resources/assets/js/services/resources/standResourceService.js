import BaseResourceService from './baseResourceService';

export default class StandResourceService extends BaseResourceService {
  constructor($log, alertService, appConfigs, $resource) {
    'ngInject';

    super($log, alertService, appConfigs);
    this.resource = $resource(this.restEndpoint + 'event/:eventId/stand/:id', { eventId: 'eventId', id: '@id' });
  }
}
