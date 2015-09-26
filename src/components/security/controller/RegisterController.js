'use strict';

/**
 * @ngInject
 */
function RegisterController(AuthService, AlertService, $state, activationToken) {
  var vm = this;
  vm.formData = {
    activationToken: activationToken
  };
  vm.register = register;

  ////////////

  function register() {
    // TODO verify formData
    //{
    //  "activationToken": "the activation token"
    //  "password": "password",
    //  "passwordConfirm": "password",
    //}
    AuthService.register(vm.formData).then(
      function () {
        AlertService.add('success', 'security.msg.register.success');
        $state.go('security.login', {}, {'reload': true});
      }, function (response) {
        var msg;
        switch (response.status) {
          case 400:
            msg = 'security.msg.register.error.400';
            break;
          case 404:
            msg = 'security.msg.common.error.404';
            break;
          default:
            msg = 'security.msg.common.error.unknown';
        }
        AlertService.add('danger', msg);
      }
    );
  }
}

module.exports = RegisterController;
