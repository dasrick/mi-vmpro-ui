'use strict';

module.exports = {
  'app': {
    url: '',
    //abstract: true,
    views: {
      'app': {
        templateUrl: '/views/core/app.html',
        controller: 'CoreController as coreVm'
      }
    }
  }
};
