(function () {

  /*###############################################################################################*/

  function testPersonModule(person, assert) {
    assert.ok( person.isPersonModule, true );

    assert.strictEqual( person.name   , 'Matz' );
    assert.strictEqual( person.greet(), 'My name is Matz' );
  };

  function testPersonAndObjectModule(person, assert) {
    testPersonModule(person, assert)

    assert.strictEqual( person.foo, 'foo' );
  };

  function testExtendInPerson(Person, assert) {
    assert.strictEqual( Person.bar  , 'bar' );
    assert.strictEqual( Person.foo(), 'foo' );
  };

  function beforeEach() {
    function Person(name) {
      this.name = name;
    };

    this.defaultName  = 'Matz';
    this.personObject = { name: this.defaultName };
    this.Person       = Person;
    this.buildPerson  = function(name) {
      return new Person(name || this.defaultName);
    };

    this.BarModule    = { bar: 'bar', foo: function() { return 'foo' } };
    this.PersonModule = {
      isPersonModule: true,

      greet: function() {
        return 'My name is ' + this.name;
      }
    };
  };

  function afterEach() {
    this.defaultName  = undefined;
    this.personObject = undefined;
    this.Person       = undefined;
    this.buildPerson  = undefined;
  };


  /*###############################################################################################*/


  QUnit.module( '_.includeIn', {
    setup:    beforeEach,
    teardown: afterEach
  });

  QUnit.test( 'should include module properties inside of target prototype', function( assert ) {
    _.includeIn(this.Person, this.PersonModule);

    var person = this.buildPerson();

    testPersonModule(person, assert);
  });

  QUnit.test( 'should include module properties inside of target', function( assert ) {
    var person = this.personObject;

    _.includeIn(person, this.PersonModule);

    testPersonModule(person, assert);
  });

  QUnit.test( 'should include all module properties inside of target prototype', function( assert ) {
    _.includeIn(this.Person, [this.PersonModule, {foo: 'foo'}]);

    var person = this.buildPerson();

    testPersonAndObjectModule(person, assert);
  });

  QUnit.test( 'should include module properties inside of target', function( assert ) {
    var person = this.personObject;

    _.includeIn(person, [this.PersonModule, {foo: 'foo'}]);

    testPersonAndObjectModule(person, assert);
  });

  QUnit.test( 'should throws an error when the target is not an object', function( assert ) {

    _.each([undefined, null, false, 1, "string"], function(target) {
      assert.throws(
        function() { _.includeIn(target, this.PersonModule); },
        '_.includeIn: target must be a constuctor or an object.'
      );
    });

  });

  QUnit.test( 'should throws an error when the module is invalid', function( assert ) {

    _.each([undefined, null, false, 1, "string"], function(invalidModule) {
      assert.throws(
        function() { _.includeIn(this.personObject, invalidModule); },
        '_.includeIn: all mixins must be objects.'
      );
    });

  });

  QUnit.test( 'should throws an error when some module is invalid', function( assert ) {
    assert.throws(
      function() {
        _.includeIn(this.Person, [this.PersonModule, {foo: 'foo'}, 1]);
      },
      '_.includeIn: all mixins must be objects.'
    );
  });


  /*###############################################################################################*/


  QUnit.module( '_.extendIn', {
    setup:    beforeEach,
    teardown: afterEach
  });

  QUnit.test( 'should include module properties inside of target constructor', function( assert ) {
    _.extendIn(this.Person, this.BarModule);

    testExtendInPerson(this.Person, assert);
  });

  QUnit.test( 'should include all module properties inside of target constructor', function( assert ) {
    _.extendIn(this.Person, [this.BarModule, {baz: 'baz'}]);

    testExtendInPerson(this.Person, assert);

    assert.strictEqual( this.Person.baz, 'baz' );
  });

  QUnit.test( 'should throws an error when the target is not a function', function( assert ) {

    _.each([undefined, null, false, 1, "string"], function(target) {
      assert.throws(
        function() { _.extendIn(target, this.PersonModule); },
        '_.extendIn: target must be a function.'
      );
    });

  });

  QUnit.test( 'should throws an error when the module is invalid', function( assert ) {

    _.each([undefined, null, false, 1, "string"], function(invalidModule) {
      assert.throws(
        function() { _.extendIn(this.Person, invalidModule); },
        '_.extendIn: all mixins must be objects.'
      );
    });

  });

  QUnit.test( 'should throws an error when some module is invalid', function( assert ) {
    assert.throws(
      function() {
        _.extendIn(this.Person, [this.PersonModule, {foo: 'foo'}, 1]);
      },
      '_.extendIn: all mixins must be objects.'
    );
  });

  /*###############################################################################################*/

})();
