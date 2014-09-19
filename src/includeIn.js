(function(_) {
  var validations = {
    fn: {
      error: 'target must be a function.',
      strategy: _.isFunction
    },
    mixin: {
      error: 'all mixins must be objects.',
      strategy: _.isObject
    },
    object: {
      error: 'target must be a constuctor or an object.',
      strategy: _.isObject
    }
  },

  cbKeys = {
    include: 'included',
    extend: 'extended'
  };

  function validationErrorFor(errorType, strategy) {
    return '_.' + strategy + 'In: ' + validations[errorType]['error'];
  }

  function validStrategy(errorType, strategy, target) {
    var isValid = validations[errorType]['strategy'];

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

    return _.map(mixins, function(mixin) { return validStrategy('mixin', strategy, mixin) });
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
    validStrategy('fn', 'extend', target);

    return handledWith('extend', target, mixin);
  };

  function includeIn(target, mixin) {
    var object = validStrategy('object', 'include', target.prototype || target);

    return handledWith('include', target, mixin, object);
  };

  _.mixin({
    extendIn:  extendIn,
    includeIn: includeIn
  });
})(this._);
