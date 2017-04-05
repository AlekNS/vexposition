/**
 * @class modalService
 * @memberOf angular.services
 * @description Helper Service to display modals.
 */
export default function ModalService ($q, $http, $templateCache, $injector, $compile, $window, $rootScope) {

  // Private dialog management class
  // idea from angular-material-dialog
  class Modal {
    constructor(templateUrl, config) {
      this.$element = null;
      this.scope = config.scope;

      this.promiseType = 'reject';

      this.templateUrl = templateUrl;
      this.controller = config.controller || (() => { });
      this.defer = $q.defer();

      this.backdrop = config.backdrop || true;
      this.keyboard = config.keyboard || false;
    }

    getTemplateContent(templateUrl) {
      return $q((resolve, reject) => {
        var template;
        if (!(template = $templateCache.get(templateUrl))) {
          $http.get(templateUrl).then((response) => {
            resolve(response.data);
          }, (reason) => reject(reason));
        } else {
          resolve(template);
        }
      });
    }

    show() {
      this.getTemplateContent(this.templateUrl).then((template) => {
        this.scope = $rootScope.$new(true, this.scope);
        if (this.controller) {
          var thisController = this.controller instanceof Function ?
                        this.controller : this.controller.slice(-1)[0];
          $injector.invoke(this.controller, thisController, {
            '$scope': this.scope,
            '$modal': Object.assign({}, this, {
              hide: (value) => {
                return this.close(value, 'resolve');
              },
              close: (value) => {
                return this.close(value);
              }
            })
          });
        }
        this.$element = $compile(template)(this.scope);

        angular.element(document.body)
                    .append(this.$element);

        jQuery(this.$element).modal({
          show: true,
          backdrop: this.backdrop,
          keyboard: this.keyboard,
        }).on('hidden.bs.modal', () => {
          this.defer[this.promiseType](this.promiseReturnValue);
          angular.element(this.$element).remove();
          this.scope.$destroy();
        });
      }, () => {
        alert(`Can't load template for modal! [${this.templateUrl}]`);
      });
      return this;
    }

    close(value, promiseType) {
      this.promiseType = promiseType == 'resolve' ? 'resolve' : 'reject';
      this.promiseReturnValue = value;
      jQuery(this.$element).modal('hide');
      return this.defer.promise;
    }
  }

  /**
   * @method show
   * @memberOf angular.services.modalService
   * @description Show modal dialog
   * @param {string} templateUrl
   * @param {object} [options] Backdrop, keyboard (bootstrap 3 modal).
   * @return {Promise}
   */
  this.show = function (templateUrl, options) {
    return (new Modal(templateUrl, options || {})).show().defer.promise;
  };

}
