'use strict';

var AppController = require('../../../../src/components/core/controller/AppController');

describe('Components:Core:Controller:AppController', function () {

  var createController;

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      var $controller = $injector.get('$controller');
      createController = function () {
        return $controller(AppController);
      };
    });
  });

  it('should init the core controller', function () {
    var controller = createController();
    expect(controller.testinger).toBe('törö');
  });

});