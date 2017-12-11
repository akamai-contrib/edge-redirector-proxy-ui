/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
app.controller("AddModalCtrl", [
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

    // Setup the form inputs (using modal params).
    $scope.form = {}
    $scope.errorMessage = null

    // ---
    // PUBLIC METHODS.
    // ---

    // Wire the modal buttons into modal resolution actions.
    $scope.cancel = modals.reject
    // I process the form submission.
    $scope.submit = confirmSubmission

    function confirmSubmission() {
      $scope.confirmationModal = true
      $scope.message =
        "Are you sure you want to add the following rule to this policy?"
      $scope.confirmButton = "Yes"
      $scope.submit = submit
    }

    function submit() {
      edgeredirectorRules.add($scope.form, false).then(function(res) {
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
