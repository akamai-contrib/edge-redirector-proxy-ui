/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
'use strict';

app.directive('subnavToggle', subnavToggle)

function subnavToggle() {
  return subnavToggleDirective;
  
  function subnavToggleDirective() {
    return {
      link: function (scope, element, attrs, ctrl) {
        element.on('click', function () {
          if (element.parent().hasClass('open')) {
            element.parent().removeClass('open');
          } else {
            element.parent().addClass('open');
          }
        })
      }
    }
  }
}
