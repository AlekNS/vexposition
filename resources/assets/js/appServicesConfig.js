export default function ApplicationServicesConfigurator ($provide, $httpProvider, $qProvider,
                                                         $logProvider, $resourceProvider) {
  'ngInject';

  // @TODO: Add ifdef webpack processing to enable/disable debug.
  $logProvider.debugEnabled(false);

  $qProvider.errorOnUnhandledRejections(false);

  // @TODO: Add interceptor to display ajax-request overlay, or add processing uncatched exceptions.
  $provide.factory('defaultHttpInterceptor', function ($q, $rootScope, appConfigs) {
    'ngInject';

    return {
      request: function (config) {
        if (!config.url.indexOf(appConfigs.apiUrl)) {
          $rootScope.$broadcast('$httpRequest:api');
        }
        return config;
      },
      response: function (response) {
        if (!response.config.url.indexOf(appConfigs.apiUrl)) {
          $rootScope.$broadcast('$httpResponse:api');
        }
        return response;
      },
      requestError: function (rejection) {
        $rootScope.$broadcast('$httpRequestError', rejection);
        return $q.reject(rejection);
      },
      responseError: function (rejection) {
        $rootScope.$broadcast('$httpResponseError', rejection);
        return $q.reject(rejection);
      }
    };
  });

  $httpProvider.interceptors.push('defaultHttpInterceptor');

  angular.extend($httpProvider.defaults.headers.common, {
    'X-XSRF-TOKEN': _.get(window, 'Laravel.csrfToken')
  });

  angular.extend($resourceProvider.defaults.actions, {
    index: {method: 'GET', array: true},
    update: {method: 'PUT'}
  });
}
