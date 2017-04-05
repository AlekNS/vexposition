/**
 * @function NavBarComponent
 * @name nav-bar
 * @memberOf angular.components
 * @description Top navigation bar.
 */
export default function NavBarComponent () {
  return {
    templateUrl: '/views/components/navbar.html',
    controller: function () {
      'ngInject';

      this.breadcrumbs = [
        // { url: '#!/event/1/stand', name: 'Stands' },
      ];
    }
  };
}
