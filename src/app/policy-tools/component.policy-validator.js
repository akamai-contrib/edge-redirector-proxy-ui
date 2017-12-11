/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
/*
 ** component.policy-validator.js
 */

"use strict"

function policyValidatorComponent() {
  return {
    templateUrl: "app/policy-tools/html/view.policy-validator.html",
    controllerAs: "tools",
    controller: policyValidatorCtrl
  }

  policyValidatorCtrl.$ngInject = [
    "$scope",
    "$rootScope",
    "$timeout",
    "edgeredirectorRules"
  ]

  function policyValidatorCtrl(
    $scope,
    $rootScope,
    $timeout,
    edgeredirectorRules
  ) {
    var tools = this

    tools.pageTitle = "Validator"
    tools.validate = validate
    tools.revalidate = revalidate
    tools.validated = false
    tools.ctrl = {}
    tools.config = $rootScope.config

    function revalidate() {
      tools.revalidateForm = !tools.revalidateForm
    }

    function validate() {
      // TODO: loader
      // $rootScope.showLoader = true;
      let envVars = edgeredirectorRules.envVars()

      function success(data) {
        tools.validated = true
        $rootScope.showLoader = false
        tools.revalidateForm = false
        /*
         * This adds a permanent edgeredirectorIndex to replace $index for each
         * matchRule in the akamai data returned. This solves for incorrectly
         * using $index – as seen when filtering/paging data.
         */
        angular.forEach(data.data, function(value, key) {
          value.edgeredirectorIndex = key
        })
        tools.ctrl.results = data.data
      }

      if (envVars.config.activePolicy.mock) {
        edgeredirectorRules.validate().then(success)
      } else {
        var options = {
          policy: edgeredirectorRules.envVars().config.activePolicy.id,
          version: tools.ctrl.selectedEnvironment.env
        }

        edgeredirectorRules.get(options).then(function(response) {
          options = {
            version: response.data.version,
            network: tools.ctrl.selectedNetwork.network
          }
          edgeredirectorRules.validate(options).then(success)
        })
      }
    }
  }
}
