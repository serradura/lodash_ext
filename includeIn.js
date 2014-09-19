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
      },

      cbKeys = {
        include: 'included',
        extend: 'extended'
      };

  function validationErrorFor(errorType, strategy) {
    return '_.' + strategy + 'In: ' + validationErrors[errorType];
  }

  function valid(errorType, strategy, target) {
    var isValid = validationStrategies[errorType];

    if( !isValid(target) ) throw validationErrorFor(errorType, strategy);

    return target;
  };

  function addMixinsHelpers(strategy, target, mixins) {
    target.includedMixins = function() { return this._includedMixins || []; };
    target.extendedMixins = function() { return this._extendedMixins || []; };

    target['_' + cbKeys[strategy] + 'Mixins'] = mixins;
  };

  function mixinCbOf(strategy, target, mixin) {
    var fn = mixin[cbKeys[strategy]];

    if( _.isFunction(fn) ) fn(target, mixin);
  };

  function mixinsFor(strategy, mixin) {
    var mixins = _.isArray(mixin) ? mixin : [mixin];

    return _.map(mixins, function(mixin) { return valid('mixin', strategy, mixin) });
  };

  function handledWith(strategy, target, mixin, object) {
    var container = (object || target),
        mixins    = mixinsFor(strategy, mixin);

    addMixinsHelpers(strategy, target, mixins);

    _.each(mixins, function(currentMixin) {
      _.extend(container, currentMixin);
      mixinCbOf(strategy, target, currentMixin);
    });

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
