/*###############################################################################################*/

QUnit.module( '_.supplant' );

QUnit.test( 'should interpolate data object properties', function( assert ) {
  var content = _.supplant('Username: %{name}', {name: 'Serradura'});
  assert.strictEqual( content, 'Username: Serradura' );
});


QUnit.test( 'should throw an error when the object property key was not found', function( assert ) {
  assert.throws(
    function() {
      _.supplant('Alias: %{alias}', {foo: 'Bar'});
    },
    '_.supplant: key[alias] not found'
  );
});

/*************************************************************************************************/

QUnit.test( 'should interpolate data object items', function( assert ) {
  var content = _.supplant('Username: %?', ['Serradura']);
  assert.strictEqual( content, 'Username: Serradura' );
});


QUnit.test( 'should interpolate the same data item for one item and more than one reference', function( assert ) {
  var content = _.supplant('%? %?', ['Test']);
  assert.strictEqual( content, 'Test Test' );
});


QUnit.test( 'should interpolate the same data item for one item and more than one reference', function( assert ) {
  var content = _.supplant('%? %?', ['Test']);
  assert.strictEqual( content, 'Test Test' );
});


QUnit.test( 'should throw an error when exists more references than items', function( assert ) {
  assert.throws(
    function() {
      _.supplant('%? %? %?', ['A', 'B']);
    },
    '_.supplant: key[2] not found'
  );
});

/*###############################################################################################*/

QUnit.module( '_.supplant (_.sup)' );

QUnit.test( 'should be an alias for _.supplant', function( assert ) {
  assert.strictEqual( _.sup, _.supplant );
});

/*###############################################################################################*/

QUnit.module( '_.supplant.byList' );

QUnit.test( 'should be a shortcut for interpolate with data items', function( assert ) {
  var content = _.supplant.byList('Username: %?', ['Serradura']);
  assert.strictEqual( content, 'Username: Serradura' );
});

/*###############################################################################################*/

QUnit.module( '_.supplant.byKey' );

QUnit.test( 'should be a shortcut for interpolate with data properties', function( assert ) {
  var content = _.sup.byKey('Name: %{name}', {name: 'Serradura'});
  assert.strictEqual( content, 'Name: Serradura' );
});

/*###############################################################################################*/

QUnit.module( '_.supplant (_.supplantKeyReplacer)', {
  setup: function( assert ) {
    _.supplantKeyReplacer = /\{\{([^\}]+)\}\}/g;
  },
  teardown: function( assert ) {
    _.supplantKeyReplacer = /%\{([^\}]+)\}/g;
  }
});

QUnit.test( 'should work with custom delimiters', function( assert ) {
  _.supplantKeyReplacer = /\{\{([^\}]+)\}\}/g;

  var content = _.sup('Name: {{name}}', {name: 'Serradura'});

  assert.strictEqual( content, 'Name: Serradura' );
});

/*###############################################################################################*/

QUnit.module( '_.supplant (_.supplantListReplacer)', {
  setup: function( assert ) {
    _.supplantListReplacer = /(\{\{\?\}\})/g;
  },
  teardown: function( assert ) {
    _.supplantListReplacer = /(%\?)/g;
  }
});

QUnit.test( 'should work with custom delimiters', function( assert ) {
  var content = _.sup('{{?}} ? {{?}}', ['R']);

  assert.strictEqual( content, 'R ? R' );
});
