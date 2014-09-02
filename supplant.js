//http://jsperf.com/string-supplant/2
(function(root) {                            // Mustache like:
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
})(this);
