/*###############################################################################################*/

(function() {
  var array  = [1, {e: 2}],
      object = {
        a: {
          b: {
            c: 'foo',
            d: array
          }
        }
      };

  QUnit.module( '_.get' );

  QUnit.test( 'should plucks a property value of a given object', function( assert ) {
    assert.ok( _.has(_.get(object, 'a')  , 'b') );
    assert.ok( _.has(_.get(object, 'a.b'), 'c') );

    assert.strictEqual( _.get(object, 'a.b.c'), 'foo' );
    assert.strictEqual( _.get(object, 'a.b.d'), array );

    assert.strictEqual( _.get(object, 'a.b.d.0'), 1 );

    assert.strictEqual( _.get(object, 'a.z')    , undefined );
    assert.strictEqual( _.get(object, 'a.b.d.2'), undefined );
    assert.strictEqual( _.get(object, 'a.b.d.1.e'), 2 );

    assert.throws(
      function() {
        _.get(_.sample([undefined, null, false]), 'error')
      },
      '_.get: invalid object'
    );

    assert.throws(
      function() {
        _.get({error: true}, _.sample([undefined, null, false]))
      },
      '_.get: query is empty'
    );
  });

  /*###############################################################################################*/

  QUnit.module( '_.fetch' );

  QUnit.test( 'should plucks a property value of a given object', function( assert ) {
    var defaultValue;

    assert.ok( _.has(_.fetch(object, 'a')  , 'b') );
    assert.ok( _.has(_.fetch(object, 'a.b'), 'c') );

    assert.strictEqual( _.fetch(object, 'a.b.c'), 'foo' );
    assert.strictEqual( _.fetch(object, 'a.b.d'), array );

    assert.strictEqual( _.fetch(object, 'a.b.d.0'), 1 );
    assert.strictEqual( _.fetch(object, 'a.b.d.1.e'), 2 );

    assert.ok( _.fetch(object, 'z', 'defaultValue'), 'defaultValue' );

    defaultValue = [];
    assert.equal( _.fetch({}, 'foo', defaultValue), defaultValue );

    defaultValue = {};
    assert.equal( _.fetch({}, 'foo', defaultValue), defaultValue );

    assert.strictEqual( _.fetch({}, 'foo', 0), 0 );
    assert.strictEqual( _.fetch({}, 'foo', null), null );
    assert.strictEqual( _.fetch({}, 'foo', false), false );
    assert.strictEqual( _.fetch({}, 'foo', undefined), undefined );

    assert.throws(
      function() {
        _.fetch(_.sample([undefined, null, false]), 'error')
      },
      '_.fetch: invalid object'
    );

    assert.throws(
      function() {
        _.fetch({error: true}, _.sample([undefined, null, false]))
      },
      '_.fetch: query is empty'
    );

    assert.throws(
      function() {
        _.fetch(object, 'a.z')
      },
      '_.fetch: key not found: a.z'
    );

    assert.throws(
      function() {
        _.fetch(object, 'a.b.d.3')
      },
      '_.fetch: key not found: a.b.d.3'
    );
  });
})();
