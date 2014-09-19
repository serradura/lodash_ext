(function(_) {
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
  })(_);

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
  })(_);

  (function(_) {
    function isContainer(object) {
      return /^f|^o/.test(typeof object);
    };

    function getObject(object, parts) {
      var length  = parts.length,
          current = object,
          container, property, i;

      if (length === 0) throw '_.get: query is empty';

      for (i = 0; i < length && isContainer(current); i++) {
        container = current;

        property = parts[i];
        current  = container[property];
      };

      return current;
    };

    function init(object, query, method) {
      var parts = (query ? String(query).split('.') : []);

      if ( !object || !_.isObject(object) ) throw '_.' + method + ': invalid object';
      if ( !query || _.isEmpty(parts) )  throw '_.' + method + ': query is empty';

      return parts;
    };

    function get(object, query) {
      var queryParts = init(object, query, 'get');

      return getObject(object, queryParts);
    };

    function fetch(object, query, defaultData) {
      var queryParts = init(object, query, 'fetch'),
          data       = getObject(object, queryParts);

      if(!data && !defaultData) {
        throw '_.fetch: key not found: ' + query;
      } else {
        return data ? data : defaultData;
      }
    };

    _.mixin({
      get:   get,
      fetch: fetch
    });
  })(_);

  (function(_) {                               // Mustache like:
    _.supplantKeyReplacer  = /%\{([^\}]+)\}/g; // /\{\{([^\}]+)\}\}/g;
    _.supplantListReplacer = /(%\?)/g;         // /(\{\{\?\}\})/g;
    _.supplant = (function(_){

      function replaceWith(datum, errorKey) {
        if (datum !== null && datum !== undefined) {
          return String(datum);
        } else {
          throw '_.supplant: key[' + errorKey + '] not found';
        }
      };

      function byList(str, data) {
        var i = 0;

        return str.replace(_.supplantListReplacer, function (match, prop, index) {
          var datum = data[i];

          if (data.length !== 1) i++;

          return replaceWith(datum, (i-1));
        });
      };

      function byKey(str, data) {
        return str.replace(_.supplantKeyReplacer, function (match, prop) {
          var datum = data[prop];

          return replaceWith(datum, prop);
        });
      };

      function f(str, data) {
        var strategy = this.isArray(data) ? byList : byKey;

        return strategy(str, data);
      };

      f.byList = byList;
      f.byKey  = byKey;

      _.mixin({sup: f});

      return f;

    })(_);
  })(_);
})(this._);
