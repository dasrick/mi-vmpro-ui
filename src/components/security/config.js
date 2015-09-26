'use strict';

module.exports = {
  'app.security.login': {
    url: '/login',
    views: {
      'box-content': {
        templateUrl: 'views/security/login.html',
        controller: 'LoginController as loginVm'
      }
    }
  },
  'app.security.register': {
    url: '/register/{activationToken:[0-9a-fA-F\\-]{36}}',
    views: {
      'box-content': {
        templateUrl: 'views/security/register.html',
        controller: 'RegisterController as registerVm'
      }
    },
    resolve: {
      activationToken: function ($stateParams) {
        return $stateParams.activationToken;
      }
    }
  },
  'app.security.password-request': {
    url: '/password-request',
    views: {
      'box-content': {
        templateUrl: 'views/security/password-request.html',
        controller: 'PasswordRequestController as passwordRequestVm'
      }
    }
  },
  'app.security.password-reset': {
    url: '/password-reset/{resetToken:[0-9a-fA-F\\-]{36}}',
    views: {
      'box-content': {
        templateUrl: 'views/security/password-reset.html',
        controller: 'PasswordResetController as passwordResetVm'
      }
    },
    resolve: {
      resetToken: function ($stateParams) {
        return $stateParams.resetToken;
      }
    }
  }
};
