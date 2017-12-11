/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
"use strict"

function edgeredirectorGlobalCtrl() {
  return edgeredirectorGlobalCtrl
  edgeredirectorGlobalCtrl.$ngInject = ["$rootScope", "configurationProfile"]
  function edgeredirectorGlobalCtrl($rootScope, configurationProfile) {
    // Global filter, hook into main search bar and any
    // tables you wish to search globally.
    $rootScope.globalCtrl = {}
    $rootScope.globalCtrl.globalFilter
    $rootScope.globalCtrl.userPrefs = {
      preloadData: true,
      useMockData: false
    }
    $rootScope.globalCtrl.test = function() {
      console.log("Working")
    }

    console.log("Global Ctrl", $rootScope)
  }
}
