/**
 * @function MapComponent
 * @name nav-bar
 * @memberOf angular.components
 * @description Interactive map.
 */
export default function NavBarComponent () {
  function setupMarkersByEvents($scope, events) {
    if (!Array.isArray(events)) {
      throw 'Events should be an Array';
    }

    $scope.markers = {};
    $scope.center.zoom = 14;
    // Transform leaflet markers
    (events || []).forEach((event) => {
      $scope.markers[event.id] = {
        lat: +event.location_lat,
        lng: +event.location_lng,
        // Add custom image
        message: '<div class="text-center"><h4>' + 
          event.name + '</h4><img style="max-width:80px;max-height:80px" src="' + 
          event.img_url + '"></div>',
        draggable: false
      };
    });

    if (events.length) {
      $scope.center.lat = +events[0].location_lat;
      $scope.center.lng = +events[0].location_lng;
    }
  }

  return {
    template: '<leaflet id="world-map" markers="markers" center="center" event-broadcast="leafletEvents" height="400px"></leaflet>',
    bindings: {
      events: '<',
      onEventClick: '&'
    },
    controller: function ($scope) {
      'ngInject';

      // leaflet defaults
      angular.extend($scope, {
        center: {
          zoom: 7
        },
        defaults: {
          scrollWheelZoom: false
        },
        leafletEvents: {
          map: {
            enable: ['zoomstart', 'drag', 'click', 'mousemove'],
            logic: 'emit'
          }
        }
      });

      // wait data events
      this.$onChanges = (objs) => {
        if (objs.events.currentValue) {
          setupMarkersByEvents($scope, objs.events.currentValue);
        }
      };

      // On marker click event
      $scope.$on('leafletDirectiveMarker.world-map.click', (event, marker) => {
        this.onEventClick({event: _.find(this.events, {id: +marker.modelName})});
      });
    }
  };
}
