'use strict';

/**
 * @name decipher.debaser.Debaser
 * @ngdoc function
 * @description Sets optional name and initializes the `base` Aspect.
 * @param {string=} name Optional name
 * @constructor
 * @description Provides a constructor for a {@link Debaser} object.
 */
angular.module('decipher.debaser').factory('debaserDebaser',
  ['$log', 'debaserAspect', 'debaserOptions',
    function debaserFactory($log, Aspect, options) {

      var defaultName = options.defaultName;

      /**
       * @ngdoc type
       * @name Debaser
       * @param {string=} name Optional name
       * @constructor
       */
      var Debaser = function Debaser(name) {
        if (!angular.isString(name)) {
          name = options.defaultName;
        }
        this.$name = name;
        this.$queue = [];
        this.$aspect('base');
        if (name !== defaultName) {
          $log.debug('$debaser: created Debaser instance with name "' + name + '"');
        } else {
          $log.debug('$debaser: created singleton Debaser instance');
        }
      };

      Debaser.prototype.$aspect = function $aspect(name) {
        var current_aspect = this.$$aspect,
            aspect,
            proto;
        if (angular.isUndefined(name)) {
          name = current_aspect.name;
        }
        if (current_aspect) {
          proto = current_aspect.proto;
          Object.keys(proto).forEach(function (name) {
            delete this[name];
          }, this);
        }
        aspect = new Aspect(name, current_aspect);
        angular.extend(this, aspect.proto);
        this.$$aspect = aspect;
        return aspect;
      };

      Debaser.prototype.$enqueue = function $enqueue() {
        var current_aspect = this.$$aspect;
        if (current_aspect) {
          this.$queue.push.apply(this.$queue, current_aspect.flush());
        }
      };

      Debaser.autoScopeProvider = function ($provide) {
        $provide.decorator('$controller',
          ['$rootScope', '$delegate', function ($rootScope, $delegate) {
            return function (name, locals) {
              locals = locals || {};
              if (!locals.$scope) {
                locals.$scope = $rootScope.$new();
              }
              $delegate(name, locals);
              return locals.$scope;
            };
          }]);
      };
      Debaser.autoScopeProvider.$inject = ['$provide'];

      /**
       * @ngdoc function
       * @name debase
       * @description Executes the queued configuration and provides it to the spec.
       * @methodOf decipher.debaser.Debaser
       * @param {object=} opts Options; these are likely to be unused during normal development
       * @param {boolean=} [opts.persist=false] If `true`, then do not flush the queue after execution.
       * @param {boolean=} [opts.autoScope=true] If `false`, then do not decorate the `$controller` service to automatically provide it a new `Scope`.
       */
      Debaser.prototype.debase = function debase(opts) {
        opts = opts || {};
        this.$enqueue();
        this.$queue.forEach(function (fn) {
          fn();
        });
        if (!opts.persist) {
          this.$queue = [];
        }
        this.$aspect('base');
        if (options.autoScope) {
          angular.mock.module(Debaser.autoScopeProvider);
        }
      };

      return Debaser;
    }]);

