'use strict';

var RoutingConfig = require('./config');

module.exports = angular.module('security', []);

angular.module('security')
  .controller('LoginController', require('./controller/LoginController'))
  .controller('PasswordRequestController', require('./controller/PasswordRequestController'))
  .controller('PasswordResetController', require('./controller/PasswordResetController'))
  .controller('RegisterController', require('./controller/RegisterController'))
  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    angular.forEach(RoutingConfig, function (config, name) {
      $stateProvider.state(name, config);
    });
    $translatePartialLoaderProvider.addPart('security');
  })
;
