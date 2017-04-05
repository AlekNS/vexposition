/**
 * @function StanCollectionComponent
 * @name stand-collection
 * @memberOf angular.components
 * @description Collection of stands.
 */
export default function StandCollectionComponent () {
  return {
    bindings: {
      stands: '<',
      onButtonClick: '&'
    },
    templateUrl: '/views/components/standCollection.html'
  };
}
