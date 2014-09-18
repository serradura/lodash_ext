(function(_) {
  var validationErrorFor = {
        mixin:  'all mixins must be objects.',
        object: 'target must be a constuctor or an object.'
      },

      withA = function(errorType, object) {
        if( !_.isObject(object) ) throw '_.includeIn: ' + validationErrorFor[errorType];

        return object;
      },

      withAn = withA;

  function appendAll(mixins, object) {
    _.each(mixins, function(mixin) {
      _.extend(object, withA('mixin', mixin));
    });
  };

  function includeIn(target, mixin) {
    var mixins = _.isArray(mixin) ? mixin : [mixin],
        object = withAn('object', target.prototype || target);

    appendAll(mixins, object);

    return target;
  };

  _.mixin({
    includeIn: includeIn
  });
})(this._);
