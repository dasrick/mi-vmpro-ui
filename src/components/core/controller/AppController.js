'use strict';
/**
 * @ngInject
 */
module.exports = function () {
  var vm = this;
  vm.appversion = process.env.appversion;
  // global app settings will placed here ...
};
