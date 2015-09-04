'use strict';

module.exports = {
  'app': {
    url: '',
    abstract: true,
    views: {
      'app': {
        templateUrl: '/views/core/app.html',
        controller: 'AppController as appVm'
      }
    }
  },
  'app.admin': {
    url: '/admin',
    abstract: true,
    views: {
      'main': {
        templateUrl: '/views/core/sidebar.html'
      }
    }
  },
  'app.management': {
    url: '/management',
    abstract: true,
    views: {
      'main': {
        templateUrl: '/views/core/sidebar.html'
      }
    }
  },
  'app.profile': {
    url: '/profile',
    abstract: true,
    views: {
      'main': {
        templateUrl: '/views/core/sidebar.html'
      }
    }
  },
  'app.security': {
    url: '',
    abstract: true,
    views: {
      'main': {
        templateUrl: '/views/core/1col-centerbox.html'
      }
    }
  }
};
