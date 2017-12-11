/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
app.config([
  "$stateProvider",
  "$urlRouterProvider",
  "$locationProvider",
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise("/")
    $stateProvider
      .state("dashboard", {
        url: "/",
        template:
          "<edgeredirector-dashboard-component></edgeredirector-dashboard-component>"
      })
      .state("staging", {
        url: "/policy-editor/staging",
        template: "<policy-editor-component></policy-editor-component>"
      })
      .state("development", {
        url: "/policy-editor/development",
        template: "<policy-editor-component></policy-editor-component>"
      })
      .state("validate", {
        url: "/policy-tools/validate",
        template: "<policy-validator-component></policy-validator-component>"
      })
  }
])
