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
      };

  function validationErrorFor(errorType, strategy) {
    return '_.' + strategy + 'In: ' + validationErrors[errorType];
  }

  function valid(errorType, strategy, target) {
    var isValid = validationStrategies[errorType];

    if( !isValid(target) ) throw validationErrorFor(errorType, strategy);

    return target;
  };

  function addMixinsWith(strategy, target, mixins) {
    var keys = {include: 'included', extend: 'extended'};

    target['_' + keys[strategy] + 'Mixins'] = mixins;
  };

  function addMixinsHelpers(target) {
    target.includedMixins = function() { return this._includedMixins || []; };
    target.extendedMixins = function() { return this._extendedMixins || []; };
  }

  function mixinsFor(strategy, mixin) {
    var mixins = _.isArray(mixin) ? mixin : [mixin];

    return _.map(mixins, function(mixin) { return valid('mixin', strategy, mixin) });
  };

  function handledWith(strategy, target, mixin, object) {
    var container = (object || target),
        mixins    = mixinsFor(strategy, mixin);

    addMixinsWith(strategy, target, mixins);
    addMixinsHelpers(target);

    _.each(mixins, function(mixin) { _.extend(container, mixin); });

    return container;
  };

  function extendIn(target, mixin) {
    valid('fn', 'extend', target);

    return handledWith('extend', target, mixin);
  };

  function includeIn(target, mixin) {
    var object = valid('object', 'include', target.prototype || target);

    return handledWith('include', target, mixin, object);
  };

  _.mixin({
    extendIn:  extendIn,
    includeIn: includeIn
  });
})(this._);
