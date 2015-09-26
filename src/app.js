'use strict';

var angular = require('angular');

process.env.appversion = require('../package.json').version;

require('angular-bootstrap');
require('angular-cache');
require('angular-jwt');
require('angular-resource');
require('angular-translate');
require('angular-translate-loader-partial');
require('angular-ui-router');
require('angular-validation-match');
require('mi-angular-alert-service');
require('mi-angular-vmp-auth-service');

var requires = [
  'ui.bootstrap',
  'angular-cache',
  'angular-jwt',
  'ngResource',
  'pascalprecht.translate',
  'ui.router',
  'validation.match',
  'mi.AlertService',
  'mi.AuthService',
  require('./components').name
];

angular.module('mi-vmpro-ui-app', requires)

  // put jwt token into requests
  .config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['config', 'CurrentUserService', 'AuthService', '$state', function (config, CurrentUserService, AuthService, $state) {
      if (config.url.substr(config.url.length - 5) === '.html') {
        return null;
      }
      if (angular.isUndefined(CurrentUserService.getAccessToken())) {
        return null;
      }
      if (CurrentUserService.isExpired()) {
        return AuthService.refresh(CurrentUserService.getRefreshToken(), CurrentUserService.getVideoManagerId()).then(
          function (response) {
            CurrentUserService.setResponseData(response);
            return CurrentUserService.getAccessToken();
          },
          function (response) {
            // was tun, wenn der refresh fehl schlug?
            console.log('Security Module jwtInterceptor', response);
            // nur so eine idee ... denn anscheinend hat der service keinen bock
            CurrentUserService.logout();
            $state.go('app.security.login', {}, {'reload': true});
          }
        );
      } else {
        return CurrentUserService.getAccessToken();
      }
    }];
    $httpProvider.interceptors.push('jwtInterceptor');
  })

  // redirect for unknown routes
  .config(function ($urlRouterProvider, $locationProvider, $resourceProvider) {
    $urlRouterProvider.otherwise(function ($injector) {
      var $state, CurrentUserService;
      CurrentUserService = $injector.get('CurrentUserService');
      $state = $injector.get('$state');
      if (CurrentUserService.isLoggedIn()) {
        $state.go('app.dashboard');
      } else {
        CurrentUserService.logout();
        $state.go('app.security.login');
      }
    });
    $resourceProvider.defaults.stripTrailingSlashes = true;
  })

  // check routes for auth and redirect if needed
  .run(function ($rootScope, $injector) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      var requireAuth = toState.data.requireAuth;
      if (requireAuth === false) {
        return;
      } else {
        var $state, CurrentUserService;
        CurrentUserService = $injector.get('CurrentUserService');
        $state = $injector.get('$state');
        if (!CurrentUserService.getAccessToken()) {
          event.preventDefault();
          CurrentUserService.logout();
          $state.go('app.security.login', {}, {'reload': true});
        }
      }
    });
  })

  // trnslation stuff
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
  .constant('ALERT_LEVELS', {
    danger: {timeout: 10000},
    warning: {timeout: 5000},
    success: {timeout: 3000},
    info: {timeout: 3000}
  })
;

angular.bootstrap(document, ['mi-vmpro-ui-app']);
