/* global runConfig */

'use strict';

/**
 * @ngdoc overview
 * @description Main module for angular-debaser.  You are unlikely to interface with this module directly in your application.
 *
 * Instead, use the global {@link debaser} function to get an instance of a {@link decipher.debaser.Debaser Debaser} object.
 *
 * **Note to developers**: all services in this module are prefixed with `debaser`.
 * @name decipher.debaser
 */
angular.module('decipherDebaser', [])
  .constant('debaserRunConfig', runConfig)
  .config(['debaserOptions', '$logProvider', '$provide',
    function config(options, $logProvider, $provide) {
      // older versions of angular-mocks do not implement this function.
      if (angular.isFunction($logProvider.debugEnabled)) {
        $logProvider.debugEnabled(options.debugEnabled);
      }
      // likewise, maybe no debug() either
      $provide.decorator('$log', ['$delegate', function ($delegate) {
        $delegate.debug = $delegate.debug || options.debugEnabled ? $delegate.log : angular.noop;
        return $delegate;
      }]);
    }
  ]);
