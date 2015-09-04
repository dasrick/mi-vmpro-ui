'use strict';

var RoutingConfig = require('./config');

module.exports = angular.module('dashboard', []);

angular.module('dashboard')
  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    angular.forEach(RoutingConfig, function (config, name) {
      $stateProvider.state(name, config);
    });
    $translatePartialLoaderProvider.addPart('dashboard');
  })
;
