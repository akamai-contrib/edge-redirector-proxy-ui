/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
app.directive('validateRow', function() {
  return {
    controller: ['$scope', function ($scope) {
      // Establish validateShow variable and set to false to hide details
      $scope.validateShow = false;
    }],
    link: function validateRow (scope, element, attrs, ctrl) {
      scope.$watch('validateShow', function(){
        (scope.validateShow) ? element.addClass('active') : element.removeClass('active');
      });
    }
  }
});

app.directive('validateTranche', function() {
  return {
    require: '^validateRow',
    link: function validateTranche (scope, element, attrs, vrCtrl) {
      // Start off with a hidden element
      element.css('display', 'none');

      // Setup watcher to check for clicks
      scope.$watch('validateShow', function(){
        scope.validateShow ? element.css('display', 'table-row') : element.css('display', 'none');
      })
    }
  }
})

app.directive('validateToggle', function() {
  return {
    require: '^validateRow',
    link: function validateToggle(scope, element, attrs, vrCtrl) {

      // On toggle button click, change the innerText and apply the scope change
      // for the validateTranche directive to consume and hide/show the details.
      element.on('click', function(){
        if (scope.validateShow) {
          element.children().removeClass('si-minus');
          element.children().addClass('si-plus');
          toggleClick();
        } else {
          element.children().removeClass('si-plus');
          element.children().addClass('si-minus');
          toggleClick()
        }
      })

      function toggleClick () {
        scope.validateShow = !scope.validateShow;
        scope.$apply();
      }
    }
  }
})
