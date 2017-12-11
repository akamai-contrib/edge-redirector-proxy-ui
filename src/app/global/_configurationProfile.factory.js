/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
"use strict"

function configurationProfile() {
  return configurationProfileFactory

  configurationProfileFactory.$inject = [
    "$http",
    "$rootScope",
    "$location",
    "edgeredirectorRules"
  ]

  function configurationProfileFactory(
    $http,
    $rootScope,
    $location,
    edgeredirectorRules
  ) {
    // Expose API
    return {
      getConfig: getConfig,
      storeActivePolicy: storeActivePolicy,
      setEnvironment: setEnvironment,
      setVersion: setVersion,
      pageMeta: pageMeta
    }

    // Services
    function getConfig() {
      $http.get("config.json").success(function(data) {
        $rootScope.config = data
        // Checks sessionStorage for previously stored policy selection.
        if (sessionStorage.activePolicy) {
          $rootScope.config.activePolicy = angular.fromJson(
            sessionStorage.activePolicy
          )
          // Get versions of activePolicy, and store in localstorage.
          if ($rootScope.globalCtrl.userPrefs.preloadData) {
            edgeredirectorRules.appLoad().then(function(response) {
              console.log(response)
            })
          }
        }
      })
    }

    function storeActivePolicy(selection) {
      $rootScope.config.activePolicy = selection
      // Places selected policy in sessionStorage.
      sessionStorage.activePolicy = angular.toJson(
        $rootScope.config.activePolicy
      )
      if ($rootScope.globalCtrl.userPrefs.preloadData) {
        edgeredirectorRules.appLoad().then(function(response) {
          console.log(response)
        })
      }
    }

    function setEnvironment() {
      var self = $location.$$path
      if (self.indexOf("production") > -1) {
        $rootScope.config.activePolicy.env = "prod"
      } else if (self.indexOf("staging") > -1) {
        $rootScope.config.activePolicy.env = "staging"
      } else if (self.indexOf("development") > -1) {
        $rootScope.config.activePolicy.env = "dev"
      }
    }

    function setVersion(ver) {
      $rootScope.config.activePolicy.ver = ver
    }

    function pageMeta() {
      var self = $location.$$path
      var meta = {}

      switch (self) {
        case self.indexOf("production"):
          meta = { title: "Production", tools: false }
          break
        case self.indexOf("staging"):
          meta = { title: "Staging", tools: true }
          break
        case self.indexOf("development"):
          meta = { title: "Development", tools: true }
          break
      }

      return meta
      // if (self.indexOf('production') > -1) {
      //   meta = {
      //     title: 'Production',
      //     tools: false
      //   };
      //   return meta;
      // } else if (self.indexOf('staging') > -1) {
      //   meta = {
      //     title: 'Staging',
      //     tools: true
      //   };
      //   return meta;
      // } else if (self.indexOf('development') > -1) {
      //   meta = {
      //     title: 'Development',
      //     tools: true
      //   };
      //   return meta;
      // }
    }
  }
}
