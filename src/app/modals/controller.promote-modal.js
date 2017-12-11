/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
app.controller("PromoteModalCtrl", [
  "$scope",
  "$rootScope",
  "edgeredirectorRules",
  "modals",
  function($scope, $rootScope, edgeredirectorRules, modals) {
    console.warn("Params", modals.params())
    $scope.config = $rootScope.config

    // Setup defaults using the modal params.
    $scope.message = modals.params().message || "Error."
    $scope.path = modals.params().path || "Redirect path error."
    $scope.destination =
      modals.params().destination || "Redirect destination error."
    $scope.confirmButton = modals.params().confirmButton || "Confirm"
    $scope.exitButton = modals.params().exitButton || "Close"

    // Setup the form inputs (using modal params).
    $scope.form = {
      input: modals.params().placeholder || ""
    }
    $scope.errorMessage = null

    // ---
    // PUBLIC METHODS.
    // ---

    // Wire the modal buttons into modal resolution actions.
    $scope.cancel = modals.reject
    // I process the form submission.
    $scope.submit = confirmSubmission

    function confirmSubmission() {
      // If no input was provided, show the user an error message.
      if (!$scope.form.selectedVersion || !$scope.form.selectedPolicy) {
        return ($scope.errorMessage = "Please provide something!")
      }
      $scope.confirmationModal = true
      $scope.message =
        "Are you sure you want to copy the following rule to " +
        $scope.form.selectedPolicy.title +
        " – " +
        $scope.form.selectedPolicy.id +
        "?"
      $scope.confirmButton = "Yes"
      $scope.submit = submit
    }

    function submit() {
      let options = {
        policy: $scope.form.selectedPolicy.id,
        version: $scope.form.selectedVersion.env
      }

      let modalData = {
        source: $scope.path,
        destination: $scope.destination
      }

      edgeredirectorRules.get(options).then(function(response) {
        let options = {
          policy: $scope.form.selectedPolicy.id,
          version: response.data.version
        }
        edgeredirectorRules.add(modalData, options).then(function(data) {
          modals.resolve(data)
        })
      })
    }
  }
])
