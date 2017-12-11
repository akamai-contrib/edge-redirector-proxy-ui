/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
app.directive("edgeredirectorAddModal", edgeredirectorAddModal)
app.directive("edgeredirectorEditModal", edgeredirectorEditModal)
app.directive("edgeredirectorEditDestination", edgeredirectorEditDestination)
app.directive("edgeredirectorEditSource", edgeredirectorEditSource)
app.directive("edgeredirectorDeleteModal", edgeredirectorDeleteModal)
app.directive("edgeredirectorPromoteModal", edgeredirectorPromoteModal)

var destinationRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w?= \.-]*)*\/?$/
var sourceRegex = /^\/.*/

function edgeredirectorPromoteModal() {
  return {
    restrict: "E",
    templateUrl: "app/modals/html/_promote-modal/promote_modal.html",
    controller: "PromoteModalCtrl"
  }
}

function edgeredirectorAddModal() {
  return {
    restrict: "E",
    templateUrl: "app/modals/html/_add-modal/add-modal.html",
    controller: "AddModalCtrl",
    scope: {
      environment: "=",
      edgeredirectorData: "="
    }
  }
}

function edgeredirectorEditModal() {
  return {
    restrict: "E",
    templateUrl: "app/modals/html/_edit-modal/edit_modal.html",
    controller: "EditModalCtrl",
    scope: {
      environment: "=",
      edgeredirectorData: "="
    }
  }
}

function edgeredirectorDeleteModal() {
  return {
    restrict: "E",
    templateUrl: "app/modals/html/_delete-modal/delete_modal.html",
    controller: "DeleteModalCtrl",
    scope: {
      environment: "=",
      edgeredirectorData: "="
    }
  }
}

function edgeredirectorEditDestination() {
  return {
    require: "ngModel",
    link: function(scope, el, attrs, ctrl) {
      ctrl.$validators.edgeredirectorEditSource = function(
        modelValue,
        viewValue
      ) {
        // console.info(ctrl);
        // console.info(scope);
        if (ctrl.$isEmpty(modelValue)) {
          ctrl.$modelValue = scope.ruleData.destination
          ctrl.$viewValue = scope.ruleData.destination
          ctrl.$render()
          // console.log('Is empty', modelValue);
          // TODO: Remove form validation error when empty
          return true
        }

        if (destinationRegex.test(viewValue)) {
          el.unbind("blur", function() {
            // TODO: Remove form validation error
          })
          console.log("Model", modelValue)
          return true
        }

        // TODO: Show form validation error
        return false
      }
    }
  }
} // edgeredirectorEditDestination()

function edgeredirectorEditSource() {
  return {
    require: "ngModel",
    link: function(scope, el, attrs, ctrl) {
      ctrl.$validators.edgeredirectorEditSource = function(
        modelValue,
        viewValue
      ) {
        if (ctrl.$isEmpty(modelValue)) {
          ctrl.$modelValue = scope.ruleData.source
          ctrl.$viewValue = scope.ruleData.source
          ctrl.$render()
          // console.log('Is empty', modelValue);
          // TODO: Remove form validation error when empty
          return true
        }

        if (sourceRegex.test(viewValue)) {
          el.unbind("blur", function() {
            // TODO: Remove form validation error
          })
          console.log("Model", modelValue)
          return true
        }

        // TODO: Show form validation error
        return false
      }
    }
  }
} // edgeredirectorEditSource()
// $ngInject.errorModal($rootScope, DisplayError);
app.directive("errorModal", [
  "$rootScope",
  "modals",
  function errorModal($rootScope, modals) {
    return {
      restrict: "A",
      transclude: false,
      link: function(scope, element, attr) {
        // Start app with hidden error modal.
        element.css("display", "none")

        // Setup watcher for appErrorDisplay.
        $rootScope.$on("appErrorDisplay", function(scopeInfo) {
          let error = $rootScope.appError
          const genericCode = "Request failed"
          const genericMessage =
            "Generic issue with service, check the console for more info"
          const proxyError = "Unexpected token E in JSON at position 0"

          scope.appError = {
            title: error.title || "Error",
            code: genericCode,
            message: genericMessage,
            action: error.action || "Report",
            cancel: error.cancel || "Cancel"
          }

          // Handle Status Codes
          if (error.msg) {
            scope.appError.code = error.msg.code || genericCode
            scope.appError.message = error.msg.message || genericMessage
          }

          // Handle edgeredirector Services Proxy error
          if (error.msg.message == proxyError) {
            scope.appError.title = "Proxy Error | "
            scope.appError.code = 500
            scope.appError.message =
              "edgeredirector Services have experienced a proxy error"
          }

          // TODO: Use loader service for this!
          $rootScope.showLoader = false
          element.css("display", "flex")
        })

        // Setup modal closing options
        // TODO: Click on backdrop closes modal.
        scope.cancel = function() {
          element.css("display", "none")
        }
      }
    }
  }
])

// $ngInject.edgeredirectorModals($rootScope, modals);
app.directive("edgeredirectorModals", [
  "$rootScope",
  "modals",
  function edgeredirectorModals($rootScope, modals) {
    // Return the directive configuration.
    return link

    // Bind the JS events to the scope.
    function link(scope, element, attributes) {
      console.log("Modal init")
      // Define which modal window is being rendered. By convention,
      // the subview will be the same as the type emitted by the modals
      // service object.
      scope.subview = null

      // If user clicks directly on the backdrop, consider it an
      // escape from the modal window, and reject implicitly.
      element.on("click", function handleClickEvent(event) {
        if (element[0] !== event.target) {
          return
        }
        scope.$apply(modals.reject)
      })

      // Listen for "open" events emitted by the modals service object.
      $rootScope.$on("modals.open", function handleModalOpenEvent(
        event,
        modalType
      ) {
        scope.$apply(function() {
          scope.subview = modalType
        })
      })

      // Listen for "close" events emitted by the modals service object.
      $rootScope.$on("modals.close", function handleModalClose(event) {
        scope.subview = null
      })
    }
  } // edgeredirectorModals()
])
