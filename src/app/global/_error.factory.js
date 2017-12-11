/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
function displayError() {
  return displayErrorFactory;

  displayErrorFactory.$ngInject = ['$rootScope']
  function displayErrorFactory($rootScope) {
    return {
      show: function (err) {
        // modals.reject();
        // console.log('not emitted');
        $rootScope.appError = err;
        $rootScope.$emit('appErrorDisplay', err);
      },
      hide: function () {
        $rootScope.$emit('appErrorDisplay', err);
      },
      report: function () {
        // Logic for logging the error.
      }
    }
  }
}
