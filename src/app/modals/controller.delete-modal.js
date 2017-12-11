/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
app.controller("DeleteModalCtrl", [
  "$scope",
  "$rootScope",
  "edgeredirectorRules",
  "modals",
  function($scope, $rootScope, edgeredirectorRules, modals) {
    console.warn("Params", modals.params())
    var config = $rootScope.config
    // Setup defaults using the modal params.
    $scope.message = modals.params().message || "Error."
    $scope.confirmButton = modals.params().confirmButton || "Confirm"
    $scope.exitButton = modals.params().exitButton || "Close"
    $scope.source = modals.params().source || "Null"
    $scope.destination = modals.params().destination || "Null"
    $scope.errorMessage = null

    // ---
    // PUBLIC METHODS.
    // ---

    console.log("DELETE MODAL CTRL", $scope)
    // Wire the modal buttons into modal resolution actions.
    $scope.cancel = modals.reject
    // I process the form submission.
    $scope.submit = submit

    // Setup data model to send to server
    let modalData = {
      source: $scope.source,
      destination: $scope.destination
    }

    function submit() {
      edgeredirectorRules.delete(modalData).then(function(res) {
        $scope.$parent.$parent.$parent.manage.edgeredirectorData = res.data

        /*
                * TODO: Make this a service.
                * This adds a permanent edgeredirectorIndex to replace $index for each
                * matchRule in the akamai data returned. This solves for incorrectly
                * using $index – as seen when filtering/paging data.
                */
        angular.forEach(
          $scope.$parent.$parent.$parent.manage.edgeredirectorData.matchRules,
          function(value, key) {
            value.edgeredirectorIndex = key
          }
        )

        modals.resolve(res)
      })
    }
  }
])
