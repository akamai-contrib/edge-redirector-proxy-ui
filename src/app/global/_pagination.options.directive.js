/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
'use strict';

function paginationOptions() {
  return {
    replace: true,
    templateUrl: '/app/global/html/_pagination.options.html',
    link: paginationOptionsLink
  };

  function paginationOptionsLink(scope, element, attrs, ctrl) {
    scope.options = [
      { value: 5, name: '5 Redirects' },
      { value: 10, name: '10 Redirects' },
      { value: 25, name: '25 Redirects' },
      { value: 50, name: '50 Redirects' },
      { value: 100, name: '100 Redirects' }
    ]
  }
}
