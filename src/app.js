'use strict';

var angular = require('angular');

process.env.appversion = require('../package.json').version;

require('angular-resource');
require('angular-translate');
require('angular-translate-loader-partial');
require('angular-ui-router');

var requires = [
  'ngResource',
  'pascalprecht.translate',
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
  .config(function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/i18n/{part}/{lang}.json'
    });
    // add translation table
    $translateProvider
      .registerAvailableLanguageKeys(['en', 'de'], {
        'en_*': 'en',
        'de_*': 'de'
      })
      .determinePreferredLanguage();

    /*
     The fallback language is not working ...
     $translateProvider.fallbackLanguage('en');
     The following workaround sets the preferred language to english,
     if the detection failed or the detected language is not known.
     */
    var language = $translateProvider.preferredLanguage();
    if ((language !== null) || !language.match(/(de).*/)) {
      return $translateProvider.preferredLanguage('de');
    }
  })
;

angular.bootstrap(document, ['mi-vmpro-ui-app']);
