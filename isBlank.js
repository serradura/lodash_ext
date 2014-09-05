//http://jsperf.com/isblank2
(function(_) {
  function validateObjectsWith(fn, val) {
    if ( _.isString(val) || (_.isArray(val) || fn(val)) ) return _.isEmpty(val);
  }

  _.mixin({
    isBlank: function( val ) {
      var objectValidation;

      if ( _.isNumber(val) && !_.isNaN(val) ) return false;

      if ( _.isPlainObject ) {
        objectValidation = validateObjectsWith(_.isPlainObject, val);
      } else {
        if ( _.isDate(val) || _.isFunction(val) || _.isRegExp(val) || _.isElement(val) ) return false;

        objectValidation = validateObjectsWith(_.isObject, val);
      }

      return ( objectValidation || (val ? false : true) );
    },

    isPresent: function(val) {
      return !_.isBlank(val);
    }
  });
})(this._);
