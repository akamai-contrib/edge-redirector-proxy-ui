/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
/*
** Angular Module Declaration, module deps must be added here.
*/

// Main Dependencies
var deps = [
  "ui.router",
  "angular-toArrayFilter",
  "angularUtils.directives.dirPagination",
  "edgeredirector2.global",
  "edgeredirector2.dashboard",
  "edgeredirector2.policy-editor",
  "edgeredirector2.policy-tools"
]

var app = angular.module("edgeredirector2", deps)
