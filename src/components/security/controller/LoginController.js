'use strict';

/**
 * @ngInject
 */
function LoginController(AuthService, CurrentUserService, AlertService, $state) {
  var vm = this;
  vm.formData = {};
  vm.login = login;

  redirect();

  ////////////

  function login() {
    // TODO verify formData
    //{
    //  "username":"theUsername",
    //  "password":"thePassword"
    //}
    AuthService.login(vm.formData).then(
      function (response) {
        CurrentUserService.setResponseData(response);
        redirect();
      }, function (response) {
        var msg;
        switch (response.status) {
          case 400:
            msg = 'security.msg.login.error.400';
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

  function redirect() {
    if (CurrentUserService.isLoggedIn()) {
      $state.go('asset-management.videos', {}, {'reload': true});
    }
  }

}

module.exports = LoginController;
