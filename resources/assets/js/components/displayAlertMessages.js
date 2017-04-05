/**
 * @function DisplayAlertMessagesComponent
 * @name display-alert-messages
 * @memberOf angular.components
 * @description Display formatted messages in alert container.
 */
export default function DisplayAlertMessagesComponent () {
  return {
    templateUrl: '/views/components/displayAlertMessages.html',
    bindings: {
      messages: '<',
      type: '@'
    },
    controller: function () {
      'ngInject';

      // wait message events
      this.$onChanges = (objs) => {
        if (objs.messages.currentValue) {
          this.messages = objs.messages.currentValue;
        }
      };
    }
  };
}
