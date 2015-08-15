'use strict';

var angular = require('angular');

process.env.appversion = require('../package.json').version;

require('angular-resource');
require('angular-ui-router');

var requires = [
  'ngResource',
  'ui.router',
  require('./components').name
];

angular.module('mi-vmpro-ui-app', requires)
  .config(function ($urlRouterProvider, $locationProvider, $resourceProvider) {
    $urlRouterProvider.otherwise(function ($injector) {
      var $state;
      $state = $injector.get('$state');
      //if (UserService.isLoggedIn() === true) {
      //  $state.go('app.management.dashboard');
      //} else {
      //  $state.go('app.security.login');
      //}
    });
    $resourceProvider.defaults.stripTrailingSlashes = true;
    //$locationProvider.html5Mode(true).hashPrefix('!');
  })
;

angular.bootstrap(document, ['mi-vmpro-ui-app']);
