/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
/*
** Angularize policyEditor functions
*/

"use strict"

let globalDeps = [
  // 'edgeredirector2.global.pagination'
]

angular
  .module("edgeredirector2.global", globalDeps)
  .constant("edgeredirectorConstants", edgeredirectorConstants())
  .factory("configurationProfile", configurationProfile())
  .factory("DisplayError", displayError())
  .factory("loader", loader())
  .directive("subnavToggle", subnavToggle())
  .directive("paginationOptions", paginationOptions)
  .factory("edgeredirectorRules", edgeredirectorRules())
  .controller("edgeredirectorGlobalCtrl", edgeredirectorGlobalCtrl())
