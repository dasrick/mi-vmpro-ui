'use strict';

var CoreController = require('../../../../src/components/core/controller/CoreController');

describe('Components:Core:Controller:CoreController', function () {

  var createController;

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      var $controller = $injector.get('$controller');
      createController = function () {
        return $controller(CoreController);
      };
    });
  });

  it('should init the core controller', function () {
    var controller = createController();
    expect(controller.testinger).toBe('törö');
  });

});