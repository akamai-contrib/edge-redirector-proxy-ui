/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
/*
** Component.homepage.js
*/

"use strict"

// Header Controller
function edgeredirectorDashboardComponent() {
  return {
    templateUrl: "app/dashboard/html/view.dashboard.html",
    controllerAs: "dashboard",
    controller: dashboardViewCtrl
  }

  dashboardViewCtrl.$ngInject = ["$scope", "$rootScope", "configurationProfile"]

  function dashboardViewCtrl($scope, $rootScope, configurationProfile) {
    var dashboard = this
    var activePolicy = configurationProfile.storeActivePolicy
    dashboard.config = $rootScope.config //should stay in sync as its a ref)

    // Scope
    dashboard.selectedPolicy = ""
    dashboard.switchActivePolicy = switchActivePolicy

    // Functions
    function switchActivePolicy() {
      activePolicy(dashboard.selectedPolicy)
      console.info("[New App Policy Selected]", dashboard.config)
    }

    console.info("[App Policy Loaded]", dashboard.config)
  }
}
