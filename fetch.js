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
})(this._);
