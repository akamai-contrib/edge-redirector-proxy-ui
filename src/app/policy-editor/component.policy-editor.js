/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
/*
** component.policy-editor.js
*/

"use strict"

function policyEditorComponent() {
  return {
    templateUrl: "app/policy-editor/html/view.policy-editor.html",
    controllerAs: "manage",
    controller: policyEditorCtrl
  }

  policyEditorCtrl.$ngInject = [
    "$scope",
    "$rootScope",
    "$state",
    "edgeredirectorRules",
    "configurationProfile"
  ]

  function policyEditorCtrl(
    $scope,
    $rootScope,
    $state,
    edgeredirectorRules,
    configurationProfile
  ) {
    /*
     *  CONFIGURATION BASED ON ROUTE
     */
    configurationProfile.setEnvironment()

    /*
     *  SETUP CONTROLLER INSTANCE
     */
    var manage = this
    manage.envSettings = {}
    manage.dragDropMode = false
    manage.edgeredirectorOrder = edgeredirectorOrder
    manage.destroyTable = false
    manage.location = $state.current.name
    manage.detailSwitch = detailSwitch
    manage.list = true

    /*
     *  BUSINESS LOGIC
     */

    edgeredirectorRules.get().then(function(response) {
      configurationProfile.setVersion(response.data.version)
      var meta = configurationProfile.pageMeta()
      manage.pageTitle = meta.title
      manage.editTools = meta.tools
      manage.envSettings = {
        version: response.data.version
      }
      manage.edgeredirectorData = response.data
      /*
       * TODO: Make this a service.
       * This adds a permanent edgeredirectorIndex to replace $index for each
       * matchRule in the akamai data returned. This solves for incorrectly
       * using $index – as seen when filtering/paging data.
       */
      angular.forEach(manage.edgeredirectorData.matchRules, function(
        value,
        key
      ) {
        value.edgeredirectorIndex = key
      })
      manage.pageLoaded = true
    })

    // var edgeredirectorDataOld = '';

    function detailSwitch(view) {
      if (view == "list") {
        manage.list = true
      } else if (view == "detail") {
        manage.list = false
      }
    }

    function edgeredirectorOrder(action) {
      if (action.indexOf("init") > -1) {
        manage.dragDropMode = !manage.dragDropMode
      } else if (action.indexOf("saveState") > -1) {
        console.log("Saving Order")
        // TODO: Replace timeout, with actual sending of the data. This is only to demonstrate UI functionality.
        $timeout(function() {
          console.warn("Save Complete")
          manage.dragDropMode = !manage.dragDropMode
        }, 500)
      } else if (action.indexOf("cancel") > -1) {
        edgeredirectorRules
          .getByVersion(manage.envSettings.version)
          .then(function(response) {
            manage.edgeredirectorData = response.data
            manage.dragDropMode = !manage.dragDropMode
          })
      }
    }

    $scope.$watch("manage.dragDropMode", function() {
      console.log("Drag", manage.dragDropMode)
    })

    manage.sortableOptions = {
      handle: "> .ruleHandle",
      stop: function(event, ui) {
        // Actions here
      }
    }
  }
}
