/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
"use strict"

function edgeredirectorRules() {
  return edgeredirectorRulesFactory

  edgeredirectorRulesFactory.$ngInject = [
    "$http",
    "$q",
    "$log",
    "$rootScope",
    "loader",
    "$location",
    "modals",
    "DisplayError"
  ]

  function edgeredirectorRulesFactory(
    $http,
    $q,
    $log,
    $rootScope,
    loader,
    $location,
    modals,
    DisplayError
  ) {
    /*
     *  DEFINE SOME REUSABLE DATA
     */

    const mockData = {
      policy: "/mock-data/policy-data.json",
      validate: "/mock-data/policy-validator.json"
    }

    /*
     *  DEFINE HELPERS
     */

    function envVars() {
      return {
        config: $rootScope.config,
        appEnv: $rootScope.config.app.env,
        api: $rootScope.config.api
      }
    }

    function handleSuccess(data) {
      console.info("[Request Success]", data)
      modals.resolve()
      loader.loaded()
      return data
    }

    function handleError(msg, code) {
      // Setup vars for error modal.
      let err = { msg, code, show: true, cancel: "Done" }

      // Close any existing modals and log errors in console
      modals.reject()
      $q.reject(msg)
      $log.error(msg, code)

      // Report the error to user in modal
      DisplayError.show(err)
    }

    /*
     *  APP SERVICES
     */

    function appLoad() {
      let self = this
      let envVars = self.envVars()
      // Load the mock files into localStorage.
      // TODO: Add any mock files that need loading here.
      if (envVars.config.activePolicy.mock) {
        return request(mockData.policy)
      } else {
        return request(mockData.policy)
      }

      function request(url) {
        return $http
          .get(url)
          .success(self.handleSuccess)
          .error(self.handleError)
      }
    } /* end appLoad */

    /*
     *  POLICY SERVICES
     */

    // Get the latest version for the policy & env.
    function get(options) {
      let self = this
      let envVars = self.envVars()
      let root = envVars.api[envVars.appEnv].activeVersion

      // Check for mock, override, or default scenarios.
      if (envVars.config.activePolicy.mock) {
        return request(mockData.policy)
      } else if (options) {
        return request(root + options.policy + "/" + options.version)
      } else {
        return request(
          root +
            envVars.config.activePolicy.id +
            "/" +
            envVars.config.activePolicy.env
        )
      }

      // Submit the service request.
      function request(url) {
        return $http
          .get(url)
          .success(self.handleSuccess)
          .error(self.handleError)
      }
    } /* end get */

    function getByVersion(version, policy) {
      let self = this
      let envVars = self.envVars()
      let root = envVars.api[envVars.appEnv].policyByVersion

      if (policy) {
        return request(root + policy + "/" + version)
      } else {
        return request(root + envVars.config.activePolicy.id + "/" + version)
      }

      // Submit the service request.
      function request(url) {
        return $http
          .get(url)
          .success(self.handleSuccess)
          .error(self.handleError)
      }
    } /* end getByVersion */

    function validate(options) {
      let self = this
      let envVars = self.envVars()

      if (envVars.config.activePolicy.mock) {
        return request(mockData.validate)
      } else {
        let url =
          envVars.api[envVars.appEnv].validate +
          envVars.config.activePolicy.id +
          "/" +
          options.version +
          "/" +
          options.network
        return request(url)
      }

      function request(url) {
        return $http
          .get(url)
          .success(handleSuccess)
          .error(handleError)
      }
    } /* end validate */

    /*
     * RULE LEVEL SERVICES
     */

    // Add a new redirect rule
    function addRule(modalData, options) {
      let self = this
      let envVars = self.envVars()
      let root = envVars.api[envVars.appEnv].addRule

      // TODO: Allow for editing of statusCode, casesensitivity, matchTypes
      let addInfo = {
        description: "string",
        matchRuleFormat: "1.0",
        matchRules: [
          {
            matches: [
              {
                caseSensitive: true,
                matchOperator: "contains",
                matchType: "path",
                matchValue: modalData.source,
                negate: true
              }
            ],
            redirectURL: modalData.destination,
            matchURL: "string",
            statusCode: 301,
            type: "erMatchRule",
            name: "string"
          }
        ]
      }

      if (options) {
        return request(root + options.policy + "/" + options.version)
      } else {
        return request(
          root +
            envVars.config.activePolicy.id +
            "/" +
            envVars.config.activePolicy.ver
        )
      }

      function request(url) {
        return $http
          .put(url, JSON.stringify(addInfo))
          .success(handleSuccess)
          .error(handleError)
      }
    } /* end addRule */

    // Edit an existing redirect rule
    function editRule(modalData) {
      let self = this
      let envVars = self.envVars()

      let url =
        envVars.api[envVars.appEnv].editRule +
        envVars.config.activePolicy.id +
        "/" +
        envVars.config.activePolicy.ver
      console.log(url)
      let editInfo = {
        currentMatchValue: modalData.oldSource,
        currentRedirect: modalData.oldDestination,
        newMatchValue: modalData.newSource,
        newRedirect: modalData.newDestination
      }

      return $http
        .put(url, JSON.stringify(editInfo))
        .success(handleSuccess)
        .error(handleError)
    } /* end editRule */

    // Delete an existing redirect rule
    function deleteRule(modalData) {
      let self = this
      let envVars = self.envVars()

      let url =
        envVars.api[envVars.appEnv].deleteRule +
        envVars.config.activePolicy.id +
        "/" +
        envVars.config.activePolicy.ver
      var deleteInfo = {
        description: "string",
        matchRuleFormat: "1.0",
        matchRules: [
          {
            matches: [
              {
                caseSensitive: true,
                matchOperator: "contains",
                matchType: "path",
                matchValue: modalData.source,
                negate: true
              }
            ],
            redirectURL: modalData.destination,
            matchURL: "string",
            statusCode: 301,
            type: "erMatchRule",
            name: "string"
          }
        ]
      }
      return $http
        .put(url, JSON.stringify(deleteInfo))
        .success(handleSuccess)
        .error(handleError)
    } /* end deleteRule */

    // Expose API
    return {
      envVars: envVars,
      handleSuccess: handleSuccess,
      handleError: handleError,
      appLoad: appLoad,
      get: get,
      getByVersion: getByVersion,
      validate: validate,
      add: addRule,
      edit: editRule,
      delete: deleteRule
    }
  }
}
