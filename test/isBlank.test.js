/*###############################################################################################*/

QUnit.module( "_.isBlank" );

QUnit.test( "should return `true` for `false` boolean equivalents", function( assert ) {
  assert.ok( _.isBlank(false)    , "false should be blank");
  assert.ok( _.isBlank("")       , "empty string should be blank");
  assert.ok( _.isBlank(undefined), "undefined string should be blank");
  assert.ok( _.isBlank(null)     , "null string should be blank");
  assert.ok( _.isBlank(NaN)      , "NaN should be blank");
});


QUnit.test( "should return `true` for empty objects", function( assert ) {
  assert.ok( _.isBlank({}), "empty object should be blank" );
  assert.ok( _.isBlank([]), "empty array should be blank" );
});


QUnit.test( "should return `false` for non empty objects", function( assert ) {
  assert.ok( !_.isBlank({a: 1}), "non empty object should not be blank" );
  assert.ok( !_.isBlank([1])   , "non empty array should not be blank" );
  assert.ok( !_.isBlank("a")   , "non empty string should not be blank" );
});


QUnit.test( "should return `false` for `0` ZERO", function( assert ) {
  assert.ok( !_.isBlank(0), "0 should not be blank" );
});


QUnit.test( "should return `false` for `true` boolean", function( assert ) {
  assert.ok( !_.isBlank(true), "true should not be blank" );
});


QUnit.test( "should return `false` for non boolean equivalents", function( assert ) {
  var element = document.createElement('br');

  assert.ok( !_.isBlank(element)         , "elements should not be blank" );
  assert.ok( !_.isBlank(function() {})   , "functions should not be blank" );
  assert.ok( !_.isBlank(_.random(1, 100)), "finite numbers should not be blank" );
  assert.ok( !_.isBlank(Infinity)        , "Infinity should not be blank");
  assert.ok( !_.isBlank(new Date)        , "dates should not be blank" );
  assert.ok( !_.isBlank(/regexp/)        , "regexp should not be blank" );
});

/*###############################################################################################*/

QUnit.module( "_.isPresent" );

QUnit.test( "should return `false` for `false` boolean equivalents", function( assert ) {
  assert.ok( !_.isPresent(false)    , "false should not be present");
  assert.ok( !_.isPresent("")       , "empty string should not not be present");
  assert.ok( !_.isPresent(undefined), "undefined string should not be present");
  assert.ok( !_.isPresent(null)     , "null string should not be present");
  assert.ok( !_.isPresent(NaN)      , "NaN should not be present");
});


QUnit.test( "should return `false` for empty objects", function( assert ) {
  assert.ok( !_.isPresent({}), "empty object should not be present" );
  assert.ok( !_.isPresent([]), "empty array should not be present" );
});


QUnit.test( "should return `true` for non empty objects", function( assert ) {
  assert.ok( _.isPresent({a: 1}), "non empty object should be present" );
  assert.ok( _.isPresent([1])   , "non empty array should be present" );
  assert.ok( _.isPresent("a")   , "non empty array should be present" );
});


QUnit.test( "should return `true` for `0` ZERO", function( assert ) {
  assert.ok( _.isPresent(0), "0 should be present" );
});


QUnit.test( "should return `true` for `true` boolean", function( assert ) {
  assert.ok( _.isPresent(true), "true should not be present" );
});


QUnit.test( "should return `false` for non boolean equivalents", function( assert ) {
  var element = document.createElement('br');

  assert.ok( _.isPresent(element)         , "elements should be present" );
  assert.ok( _.isPresent(function() {})   , "functions should be present" );
  assert.ok( _.isPresent(_.random(1, 100)), "finite numbers should be present" );
  assert.ok( _.isPresent(Infinity)        , "Infinity should be present");
  assert.ok( _.isPresent(new Date)        , "dates should be present" );
  assert.ok( _.isPresent(/regexp/)        , "regexp should be present" );
});

/*###############################################################################################*/
