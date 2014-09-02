//http://jsperf.com/isblank2
(function(root) {
  var _ = root._;

  _.mixin({
    isBlank: function( val ) {
      if ( _.isNumber(val) && !_.isNaN(val) ) return false;
      if ( _.isDate(val) || _.isFunction(val) || _.isRegExp(val) ) return false;
      if ( _.isString(val) || _.isObject(val) ) return _.isEmpty(val);

      return (val ? false : true);
    },

    isPresent: function(val) {
      return !_.isBlank(val);
    }
  });
})(this);
