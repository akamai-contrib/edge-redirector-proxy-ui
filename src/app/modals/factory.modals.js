/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
app.service('modals', ['$q', '$rootScope',
  function($q, $rootScope) {
    // I represent the currently active modal window instance.
    var modal = {
      deferred: null,
      params: null
    };

    // Return the public API.
    return({
      open: open,
      params: params,
      proceedTo: proceedTo,
      reject: reject,
      resolve: resolve
    });

    // Public methods

    // I open a modal of the given type, with the given params. If a modal
    // window is already open, you can optionally pipe the response of the
    // new modal window in the response of the current modal window. Otherwise,
    // the current modal will be rejected before the new window is opened.
    function open (type, params, pipeResponse) {
      console.log('Open Registered');
      var previousDeferred = modal.deferred;

      // Setup the new modal instance properties.
      modal.deferred = $q.defer();
      modal.params = params;
      console.log('Modal instance', modal);
      console.log('Open function params', type, params, pipeResponse);

      // Handle piping new window response into previous window's deferred value.
      // Else, no piping, reject the current window.
      if (previousDeferred && pipeResponse) {
        console.log('Inside modal if statement');
        modal.deferred.promise
          .then(previousDeferred.resolve, previousDeferred.reject);
      } else if (previousDeferred) {
        console.log('Previously Deferred', previousDeferred);
        previousDeferred.reject();
      }

      // Service obj, shouldn't have direct ref to the DOM, use events to
      // communicate with the directive that will manage the DOM elements and
      // render the modal windows.
      // Note: could be done with $watch() binding, but that is a poor choice
      // due to the fact that it would require chronic watching of acute
      // application events.
      console.log('Pre-Emitted');
      $rootScope.$emit('modals.open', type);
      console.log('Post-Emitted');
      return(modal.deferred.promise);
    }

    // Return the params associated with the current params.
    function params() {
      return(modal.params || {});
    }

    // I open a modal window with the given type and pipe the new window's
    // response into the current window's response without rejecting it
    // outright.
    // --
    // This is just a convenience method for .open() that enables the
    // pipeResponse flag; it helps to make the workflow more intuitive.
    function proceedTo( type, params ) {
        return( open( type, params, true ) );
    }

    // Reject the current modal with the given reason.
    function reject(reason) {
      if (!modal.deferred) {
        return;
      }

      modal.deferred.reject(reason);
      modal.deferred = modal.params = null;

      // Tell the modal directive to close the active modal window.
      $rootScope.$emit('modals.close');
    }

    // Resolve the current modal with the given response.
    function resolve(response) {
      if (!modal.deferred) {
        return;
      }

      modal.deferred.resolve(response);
      modal.deferred = modal.params = null;

      // Tell the modal directive to close the active modal window.
      $rootScope.$emit('modals.close');
    }
  }
]);
