/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
'use strict';

function loader() {
  return loaderFactory;
  loaderFactory.$inject = ['$rootScope'];

  function loaderFactory($rootScope) {
    return {
      loaded: function () {
        $rootScope.isAPILoaded = 'true';
      },
      notloaded: function () {
        $rootScope.isAPILoaded = 'false';
      }
    };
  }
}
