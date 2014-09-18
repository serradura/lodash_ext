(function(_) {
  var validationErrors = {
        fn:     'target must be a function.',
        mixin:  'all mixins must be objects.',
        object: 'target must be a constuctor or an object.',
      },
      validationStrategies = {
        fn:     _.isFunction,
        mixin:  _.isObject,
        object: _.isObject
      }

  function validationErrorFor(errorType, scope) {
    return '_.' + scope + 'In: ' + validationErrors[errorType];
  }

  function valid(errorType, scope, target) {
    var isValid = validationStrategies[errorType];

    if( !isValid(target) ) throw validationErrorFor(errorType, scope);

    return target;
  };

  function mixinsFor(scope, mixin) {
    var mixins = _.isArray(mixin) ? mixin : [mixin];

    return _.map(mixins, function(mixin) { return valid('mixin', scope, mixin) });
  };

  function extended(target, mixins) {
    _.each(mixins, function(mixin) { _.extend(target, mixin); });

    return target;
  };

  function extendIn(target, mixins) {
    var fn = valid('fn', 'extend', target);

    return extended(fn, mixinsFor('extend', mixins));
  };

  function includeIn(target, mixins) {
    var object = valid('object', 'include', target.prototype || target);

    return extended(object, mixinsFor('include', mixins));
  };

  _.mixin({
    extendIn:  extendIn,
    includeIn: includeIn
  });
})(this._);
