'use strict';

var RoutingConfig = require('./config');

module.exports = angular.module('core', []);

angular.module('core')
  .controller('AppController', require('./controller/AppController'))
  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    angular.forEach(RoutingConfig, function (config, name) {
      $stateProvider.state(name, config);
    });
    $translatePartialLoaderProvider.addPart('core');
  })
;

