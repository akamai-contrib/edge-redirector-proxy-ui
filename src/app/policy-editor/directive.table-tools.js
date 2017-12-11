/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
/*
** DIRECTIVE FOR ADD BUTTON AND MODAL USAGE
*/
app.directive("edgeredirectorManageAdd", [
  "modals",
  function(modals) {
    return {
      require: "^policyEditorComponent",
      link: function edgeredirectorManageAdd(scope, element, attrs, ctrl) {
        scope.$watch("$parent.manage.dragDropMode", function() {
          // (ctrl.dragDropMode) ? element.hide() : element.show();
        })

        element.bind("click", function() {
          var data = {
            message: "Add the rule.",
            confirmButton: "Add Rule",
            exitButton: "Cancel"
          }

          modals.open("add", data).then(
            function handleResolve(response) {
              console.log("Prompt resolved with [ %s ].", response)
            },
            function handleReject(error) {
              console.warn("Prompt rejected!")
            }
          )
        })
      }
    }
  }
])

app.directive("edgeredirectorManageReorder", [
  "modals",
  function(modals) {
    return {
      require: "^policyEditorComponent",
      link: function edgeredirectorManageReorder(scope, element, attrs, ctrl) {
        scope.$watch("$parent.manage.dragDropMode", function() {
          // (ctrl.dragDropMode) ? element.hide() : element.show();
        })

        element.on("click", function() {
          var data = {
            message: "Add the rule.",
            confirmButton: "Add Rule",
            exitButton: "Cancel"
          }

          modals.open("add", data).then(
            function handleResolve(response) {
              console.log("Prompt resolved with [ %s ].", response)
            },
            function handleReject(error) {
              console.warn("Prompt rejected!")
            }
          )
        })
      }
    }
  }
])

/*
** DIRECTIVE FOR PROMOTE BUTTON AND MODAL USAGE
*/
app.directive("edgeredirectorManagePromote", [
  "modals",
  function(modals) {
    return {
      link: function edgeredirectorManagePromote(scope, element, attrs, ctrl) {
        var rule = scope.rule,
          index = scope.$index,
          redirectURL = rule.redirectURL

        if (rule.matchRule) {
          var matchValue = rule.matchURL
        } else if (rule.matches) {
          var matchValue = rule.matches[0].matchValue
        }

        element.on("click", function() {
          promoteModal(
            scope.$index,
            rule.matches[0].matchValue,
            rule.redirectURL
          )
        })

        function promoteModal(index, path, destination) {
          var data = {
            message:
              "Choose the policy and version you wish to copy the above rule to.",
            index: index,
            path: path,
            destination: destination,
            confirmButton: "Promote",
            exitButton: "Cancel"
          }

          modals.open("prompt", data).then(
            function handleResolve(response) {
              console.log("Prompt resolved with [ %s ].", response)
            },
            function handleReject(error) {
              console.warn("Prompt rejected!")
            }
          )
        }
      }
    }
  }
])

/*
** DIRECTIVE FOR EDIT BUTTON AND MODAL USAGE
*/
app.directive("edgeredirectorManageEdit", [
  "modals",
  function(modals) {
    return {
      link: function edgeredirectorManageEdit(scope, element, attrs, ctrl) {
        var modalData = {
          message: "Edit the rule.",
          index: scope.$index,
          oldDestination: scope.rule.redirectURL,
          confirmButton: "Confirm",
          exitButton: "Cancel"
        }

        if (scope.rule.matchRule) {
          modalData.oldSource = scope.rule.matchURL
        } else if (scope.rule.matches) {
          modalData.oldSource = scope.rule.matches[0].matchValue
        }

        element.on("click", function() {
          console.log("Click Registered")
          modals.open("edit", modalData).then(
            function handleResolve(response) {
              console.log("Prompt resolved with [ %s ].", response)
            },
            function handleReject(error) {
              console.warn("Prompt rejected!", error)
            }
          )
        })
      }
    }
  }
])

/*
** DIRECTIVE FOR DELETE BUTTON AND MODAL USAGE
*/
app.directive("edgeredirectorManageDelete", [
  "modals",
  function(modals) {
    return {
      link: function edgeredirectorManageDelete(scope, element, attrs, ctrl) {
        var modalData = {
          message: "Are you sure you'd like to delete the following rule?",
          index: scope.$index,
          destination: scope.rule.redirectURL,
          confirmButton: "Confirm",
          exitButton: "Cancel"
        }

        if (scope.rule.matchRule) {
          modalData.source = scope.rule.matchURL
        } else if (scope.rule.matches) {
          modalData.source = scope.rule.matches[0].matchValue
        }

        element.on("click", function() {
          modals.open("delete", modalData).then(
            function handleResolve(response) {
              console.log("Prompt resolved with [ %s ].", response)
            },
            function handleReject(error) {
              console.warn("Prompt rejected!")
            }
          )
        })
      }
    }
  }
])
