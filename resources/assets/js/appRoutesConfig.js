export default function ApplicationRouteConfigurator ($routeProvider) {
  'ngInject';

  var resolveRoute = {
    userData: function (userService) {
      return userService.loadUserData();
    }
  };

  $routeProvider
    .when('/', {
      resolve: resolveRoute,
      controller: 'WelcomeCtrl',
      controllerAs: '$ctrl',
      templateUrl: '/views/welcome.html'
    })

    //
    // Event
    //
    .when('/event/:eventId/stand', {
      resolve: resolveRoute,
      controller: 'StandCtrl',
      controllerAs: '$ctrl',
      templateUrl: '/views/stands.html'
    })
    .when('/event/:eventId/stand/:standId/booking', {
      resolve: resolveRoute,
      controller: 'BookingCtrl',
      controllerAs: '$ctrl',
      templateUrl: '/views/booking.html'
    })
    .otherwise('/');
}