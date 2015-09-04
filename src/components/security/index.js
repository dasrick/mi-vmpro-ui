'use strict';

var RoutingConfig = require('./config');

module.exports = angular.module('security', []);

angular.module('security')
  //.controller('SecurityLoginController', require('./controller/LoginController'))
  //.controller('SecurityLogoutController', require('./controller/LogoutController'))
  //.controller('SecurityRequestPasswordController', require('./controller/RequestPasswordController'))
  //.factory('PermissionService', require('./service/PermissionService'))
  //.service('SecurityService', require('./service/SecurityService'))
  //.directive('hasRole', require('./directive/HasRole'))
  //.directive('hasType', require('./directive/HasType'))
  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    angular.forEach(RoutingConfig, function (config, name) {
      $stateProvider.state(name, config);
    });
    $translatePartialLoaderProvider.addPart('security');
  })
;