(function() {
  var CSON, DIST, Utils, _, lineString, mockHostFunction, path, point, polygon, resetConfig, runtime, shouldBeNull, shouldBeUndefined, shouldHaveNoValue, variables;

  global.Intl = require('intl');

  _ = require('underscore');

  path = require('path');

  CSON = require('season');

  DIST = process.env.DIST || false;

  if (DIST) {
    console.log('Running distribution');
    require('../dist/expressions.js');
    runtime = $$runtime;
  } else {
    console.log('Running debug');
    runtime = require('../runtime');
    Utils = require('../utils');
  }

  variables = CSON.readFileSync(path.join(__dirname, 'variables.cson'));

  CONFIGURE(variables);

  resetConfig = function() {
    RESETCONFIG();
    runtime.values = variables.values.form_values;
    runtime.setupValues();
    runtime.resetResults();
    return CONFIGURE(variables);
  };

  runtime.form = variables.form;

  runtime.values = variables.values.form_values;

  runtime.prepare();

  mockHostFunction = function(name, values) {
    return runtime["$$" + name] = function() {
      runtime.callbackID = arguments[arguments.length - 1];
      runtime.callbackArguments = values;
      return runtime.finishAsync();
    };
  };

  shouldBeNull = function(value) {
    return (value === null).should.be["true"]();
  };

  shouldHaveNoValue = function(value) {
    return (value === NO_VALUE).should.be["true"]();
  };

  shouldBeUndefined = function(value) {
    return (value === void 0).should.be["true"]();
  };

  beforeEach(function() {
    return resetConfig();
  });

  describe('ARRAY', function() {
    return it('returns an array from the arguments', function() {
      ARRAY().should.eql([]);
      ARRAY(1, 2, 3, 4).should.eql([1, 2, 3, 4]);
      ARRAY([1, 2], [3, 4]).should.eql([1, 2, 3, 4]);
      ARRAY([1, 2], [3, 4], [5, 6]).should.eql([1, 2, 3, 4, 5, 6]);
      ARRAY([1, 2], [3, 4], [5, [6, [7, 8]]]).should.eql([1, 2, 3, 4, 5, 6, 7, 8]);
      ARRAY(void 0, null).should.eql([void 0, null]);
      ARRAY(0/0, 0/0).should.eql([0/0, 0/0]);
      ARRAY(1, 2, 3).should.eql([1, 2, 3]);
      ARRAY(1, '2', 3).should.eql([1, '2', 3]);
      ARRAY({}, '2', 'a7').should.eql([{}, '2', 'a7']);
      ARRAY([], [], []).should.eql([]);
      ARRAY([]).should.eql([]);
      ARRAY(void 0).should.eql([void 0]);
      ARRAY(void 0, void 0).should.eql([void 0, void 0]);
      ARRAY(ARRAY([], [], [])).should.eql([]);
      ARRAY(ARRAY([], ARRAY([]), [], ARRAY())).should.eql([]);
      return ARRAY(ARRAY(ARRAY(ARRAY([1, 2], [3, 4])))).should.eql([1, 2, 3, 4]);
    });
  });

  describe('NUMS', function() {
    return it('returns an array of numbers from the arguments', function() {
      NUMS(1, 2, 3).should.eql([1, 2, 3]);
      NUMS(1, '2', 3).should.eql([1, 2, 3]);
      NUMS(1, '2', 'a7').should.eql([1, 2, 0/0]);
      return NUMS({}, '2', 'a7').should.eql([0/0, 2, 0/0]);
    });
  });

  describe('NUM', function() {
    return it('converts the input to a number', function() {
      NUM(1).should.be.exactly(1);
      NUM(-1).should.be.exactly(-1);
      NUM('1').should.be.exactly(1);
      NUM({}).should.be.NaN();
      NUM().should.be.NaN();
      NUM([]).should.be.NaN();
      return NUM('test').should.be.NaN();
    });
  });

  describe('ISNAN', function() {
    return it('tests whether the input is not a number', function() {
      ISNAN(1).should.be["false"]();
      ISNAN('1').should.be["false"]();
      ISNAN('a7').should.be["true"]();
      return ISNAN({}).should.be["true"]();
    });
  });

  describe('PRECISION', function() {
    return it('returns the precision of a number', function() {
      PRECISION(1.11).should.be.exactly(2);
      PRECISION('1').should.be.exactly(0);
      PRECISION('aaa').should.be.NaN();
      return PRECISION(1 / 3).should.be.exactly(16);
    });
  });

  describe('ACOS', function() {
    return it('returns the arccosine, or inverse cosine, of a number', function() {
      ACOS(-7).should.be.NaN();
      ACOS(0.13213).should.be.exactly(1.4382788129257988);
      ACOS(0/0).should.be.NaN();
      ACOS(void 0).should.be.NaN();
      ACOS('-7').should.be.NaN();
      ACOS('7').should.be.NaN();
      ACOS('7').should.be.NaN();
      ACOS('z7').should.be.NaN();
      return ACOS('7z').should.be.NaN();
    });
  });

  describe('AND', function() {
    return it('returns true if all of the parameters evaluate truthy', function() {
      AND(1.11).should.be["true"]();
      AND(1 > 0, 2 > 1, 3 > 2).should.be["true"]();
      AND(1 > 0, 2 > 1, '').should.be["false"]();
      AND(0, 0, 0).should.be["false"]();
      AND(1, 1, 1).should.be["true"]();
      AND(true, false).should.be["false"]();
      return AND({}, []).should.be["true"]();
    });
  });

  describe('APPLYFIELDEFFECTS', function() {
    return it('sets up events for effects', function() {
      APPLYFIELDEFFECTS({
        effects: [
          {
            event: {
              name: 'change',
              field: 'choice_field'
            },
            conditions: [
              {
                field: 'name',
                operator: 'equals',
                value: 'Test Record'
              }
            ],
            actions: [
              {
                type: 'setvalue',
                field: 'name',
                value: 'New Name'
              }
            ]
          }
        ]
      });
      runtime.events.hook_change.hook_choice_field.length.should.eql(1);
      (typeof runtime.events['hook_change']['hook_choice_field'][0]).should.eql('function');
      runtime.events = {};
      APPLYFIELDEFFECTS({});
      runtime.events.should.eql({});
      APPLYFIELDEFFECTS({
        effects: 'not an array'
      });
      runtime.events.should.eql({});
      APPLYFIELDEFFECTS({
        effects: [{}]
      });
      runtime.events.should.eql({});
      APPLYFIELDEFFECTS({
        effects: [
          {
            event: {},
            conditions: [],
            actions: []
          }
        ]
      });
      return runtime.events.should.eql({});
    });
  });

  describe('AVERAGE', function() {
    return it('returns the average of all of the parameters', function() {
      AVERAGE(1, 2, 3).should.be.exactly(2);
      AVERAGE(1, 2, 'a').should.be.NaN();
      AVERAGE(1).should.be.exactly(1);
      AVERAGE(1, 1.5, 3.75).should.be.exactly(2.0833333333333335);
      AVERAGE(1, [1.5, 3.75]).should.be.exactly(2.0833333333333335);
      AVERAGE([1, 1.5, 3.75]).should.be.exactly(2.0833333333333335);
      return AVERAGE([[1], [1.5, 3.75]]).should.be.exactly(2.0833333333333335);
    });
  });

  describe('ROUND', function() {
    return it('round the given number to the specified number of digits', function() {
      ROUND(1).should.be.exactly(1);
      ROUND(1.5).should.be.exactly(2);
      ROUND(2.5).should.be.exactly(3);
      ROUND('2.5').should.be.exactly(3);
      ROUND('test').should.be.NaN();
      ROUND(2.3333333, 4).should.be.exactly(2.3333);
      ROUND(-2.3333333, 4).should.be.exactly(-2.3333);
      ROUND(2.3333333, 7).should.be.exactly(2.3333333);
      ROUND(2.3333333, 8).should.be.exactly(2.3333333);
      return ROUND(1 / 3, 7).should.be.exactly(0.3333333);
    });
  });

  describe('CEILING', function() {
    return it('returns number rounded up, away from zero, to the nearest multiple', function() {
      CEILING(1).should.be.exactly(1);
      CEILING(1.5).should.be.exactly(2);
      CEILING(2.5).should.be.exactly(3);
      CEILING('2.5').should.be.exactly(3);
      CEILING('test').should.be.NaN();
      CEILING(2.3333333, 4).should.be.exactly(4);
      CEILING(0.13, 0.25).should.be.exactly(0.25);
      CEILING(0.31, 0.25).should.be.exactly(0.5);
      CEILING(-0.13, 0.25).should.be.exactly(0);
      return CEILING(-0.31, 0.25).should.be.exactly(-0.25);
    });
  });

  describe('CONTAINS', function() {
    return it('returns whether an array or string contains a string', function() {
      CONTAINS(['1', '2', '3'], '1').should.be["true"]();
      CONTAINS(['1', '2', '3'], '3').should.be["true"]();
      CONTAINS(['1', '2', '3'], '4').should.be["false"]();
      CONTAINS([1, 2, 3], 3).should.be["true"]();
      CONTAINS('123', '1').should.be["true"]();
      CONTAINS('123', '3').should.be["true"]();
      CONTAINS('123', '123').should.be["true"]();
      CONTAINS('123', 1).should.be["true"]();
      CONTAINS([null, 1], null).should.be["true"]();
      CONTAINS([null, 1], '').should.be["false"]();
      CONTAINS([null, 1], void 0).should.be["false"]();
      CONTAINS([null, void 0], void 0).should.be["true"]();
      return CONTAINS(null, null).should.be["false"]();
    });
  });

  describe('DESCRIPTION', function() {
    return it('returns the description of a field', function() {
      DESCRIPTION('name').should.be.exactly('Enter the name');
      return shouldBeUndefined(DESCRIPTION('invalid_field'));
    });
  });

  describe('FLOOR', function() {
    return it('returns number rounded down, towards zero, to the nearest multiple', function() {
      FLOOR(1).should.be.exactly(1);
      FLOOR(1.5).should.be.exactly(1);
      FLOOR(2.5).should.be.exactly(2);
      FLOOR(-45).should.be.exactly(-45);
      FLOOR('2.5').should.be.exactly(2);
      FLOOR('test').should.be.NaN();
      FLOOR(2.3333333, 4).should.be.exactly(0);
      FLOOR(0.13, 0.25).should.be.exactly(0);
      FLOOR(0.31, 0.25).should.be.exactly(0.25);
      FLOOR(-0.13, 0.25).should.be.exactly(-0.25);
      return FLOOR(-0.31, 0.25).should.be.exactly(-0.5);
    });
  });

  describe('CHAR', function() {
    return it('returns the character given the char code', function() {
      CHAR(65).should.eql('A');
      CHAR(90).should.eql('Z');
      return CHAR(1337).should.eql('Թ');
    });
  });

  describe('CHOICEVALUE', function() {
    return it('return a single choice value', function() {
      shouldHaveNoValue(CHOICEVALUE(''));
      shouldHaveNoValue(CHOICEVALUE(null));
      shouldHaveNoValue(CHOICEVALUE(void 0));
      shouldHaveNoValue(CHOICEVALUE(0/0));
      shouldHaveNoValue(CHOICEVALUE([]));
      shouldHaveNoValue(CHOICEVALUE({}));
      shouldHaveNoValue(CHOICEVALUE({
        test: 1
      }));
      shouldHaveNoValue(CHOICEVALUE(7));
      shouldHaveNoValue(CHOICEVALUE(true));
      shouldHaveNoValue(CHOICEVALUE('test'));
      shouldHaveNoValue(CHOICEVALUE(new Date));
      shouldHaveNoValue(CHOICEVALUE({
        choice_values: null
      }));
      shouldHaveNoValue(CHOICEVALUE({
        choice_values: []
      }));
      shouldHaveNoValue(CHOICEVALUE({
        choice_values: [],
        other_values: []
      }));
      shouldHaveNoValue(CHOICEVALUE({
        choice_values: [],
        other_values: null
      }));
      shouldHaveNoValue(CHOICEVALUE({
        choice_values: null,
        other_values: null
      }));
      shouldHaveNoValue(CHOICEVALUE({
        choice_values: null,
        other_values: []
      }));
      shouldHaveNoValue(CHOICEVALUE({
        other_values: null
      }));
      CHOICEVALUE({
        choice_values: ['a'],
        other_values: []
      }).should.be.exactly('a');
      CHOICEVALUE({
        choice_values: ['a'],
        other_values: ['b']
      }).should.be.exactly('a');
      CHOICEVALUE({
        choice_values: ['a', 'b'],
        other_values: ['c']
      }).should.be.exactly('a');
      CHOICEVALUE({
        choice_values: [],
        other_values: ['b']
      }).should.be.exactly('b');
      return CHOICEVALUE({
        choice_values: null,
        other_values: ['b']
      }).should.be.exactly('b');
    });
  });

  describe('CHOICEVALUES', function() {
    return it('return the choice values of a choice field', function() {
      shouldHaveNoValue(CHOICEVALUES(''));
      shouldHaveNoValue(CHOICEVALUES(null));
      shouldHaveNoValue(CHOICEVALUES(void 0));
      shouldHaveNoValue(CHOICEVALUES(0/0));
      shouldHaveNoValue(CHOICEVALUES([]));
      shouldHaveNoValue(CHOICEVALUES({}));
      shouldHaveNoValue(CHOICEVALUES({
        test: 1
      }));
      shouldHaveNoValue(CHOICEVALUES(7));
      shouldHaveNoValue(CHOICEVALUES(true));
      shouldHaveNoValue(CHOICEVALUES('test'));
      shouldHaveNoValue(CHOICEVALUES(new Date));
      shouldHaveNoValue(CHOICEVALUES({
        choice_values: null
      }));
      shouldHaveNoValue(CHOICEVALUES({
        choice_values: null,
        other_values: null
      }));
      shouldHaveNoValue(CHOICEVALUES({
        other_values: null
      }));
      CHOICEVALUES({
        choice_values: []
      }).should.eql([]);
      CHOICEVALUES({
        choice_values: [],
        other_values: []
      }).should.eql([]);
      CHOICEVALUES({
        choice_values: [],
        other_values: null
      }).should.eql([]);
      CHOICEVALUES({
        choice_values: null,
        other_values: []
      }).should.eql([]);
      CHOICEVALUES({
        choice_values: ['a'],
        other_values: []
      }).should.eql(['a']);
      CHOICEVALUES({
        choice_values: ['a'],
        other_values: ['b']
      }).should.eql(['a', 'b']);
      CHOICEVALUES({
        choice_values: ['a', 'b'],
        other_values: ['c']
      }).should.eql(['a', 'b', 'c']);
      CHOICEVALUES({
        choice_values: [],
        other_values: ['b']
      }).should.eql(['b']);
      return CHOICEVALUES({
        choice_values: null,
        other_values: ['b']
      }).should.eql(['b']);
    });
  });

  describe('CLEAN', function() {
    return it('removes non-printable characters from a string', function() {
      CLEAN('test').should.eql('test');
      CLEAN('test test').should.eql('test test');
      CLEAN('testԹ test').should.eql('testԹ test');
      return CLEAN('test\x00\x1D\x1Etest').should.eql('testtest');
    });
  });

  describe('CODE', function() {
    return it('returns a numeric code for the first character in a text string', function() {
      CODE('test').should.be.exactly(116);
      CODE('t').should.be.exactly(116);
      CODE('1').should.be.exactly(49);
      CODE(1).should.be.exactly(49);
      CODE(1.7).should.be.exactly(49);
      CODE('').should.be.NaN();
      return CODE({}).should.be.NaN();
    });
  });

  describe('HASOTHER', function() {
    return it('returns true if the field has an other value set', function() {
      HASOTHER({
        other_values: ['test']
      }).should.be["true"]();
      HASOTHER({
        other_values: []
      }).should.be["false"]();
      HASOTHER({
        other_values: null
      }).should.be["false"]();
      HASOTHER().should.be["false"]();
      HASOTHER(null).should.be["false"]();
      HASOTHER({
        choice_values: ['1']
      }).should.be["false"]();
      return HASOTHER({
        choice_values: ['1'],
        other_values: ['2']
      }).should.be["true"]();
    });
  });

  describe('OTHER', function() {
    return it('returns the other value if a field has it set', function() {
      OTHER({
        other_values: ['test']
      }).should.eql('test');
      OTHER({
        choice_values: ['1'],
        other_values: ['2']
      }).should.eql('2');
      (OTHER({
        other_values: []
      }) === NO_VALUE).should.be["true"]();
      (OTHER({
        other_values: null
      }) === NO_VALUE).should.be["true"]();
      (OTHER() === NO_VALUE).should.be["true"]();
      (OTHER(null) === NO_VALUE).should.be["true"]();
      return (OTHER({
        choice_values: ['1']
      }) === NO_VALUE).should.be["true"]();
    });
  });

  describe('CONCATENATE', function() {
    return it('join text strings together', function() {
      CONCATENATE('1', '2', '3').should.eql('123');
      CONCATENATE('1', 2, '3').should.eql('123');
      CONCATENATE('1', {}, '3').should.eql('13');
      CONCATENATE('1', null, '3').should.eql('13');
      CONCATENATE('1', null, void 0).should.eql('1');
      CONCATENATE([], null, void 0).should.eql('');
      CONCATENATE('').should.eql('');
      CONCATENATE().should.eql('');
      CONCATENATE(null).should.eql('');
      CONCATENATE(void 0).should.eql('');
      CONCATENATE('1', [2], '3').should.eql('123');
      return CONCATENATE('1', [2], '3', [4, 5]).should.eql('12345');
    });
  });

  describe('COMPACT', function() {
    return it('compacts an array', function() {
      COMPACT([1, 2, 3]).should.eql([1, 2, 3]);
      COMPACT([]).should.eql([]);
      (COMPACT(null) === void 0).should.be["true"]();
      (COMPACT(void 0) === void 0).should.be["true"]();
      (COMPACT({}) === void 0).should.be["true"]();
      COMPACT([void 0]).should.eql([]);
      COMPACT([null]).should.eql([]);
      COMPACT([0]).should.eql([0]);
      return COMPACT(['', 0, 1]).should.eql(['', 0, 1]);
    });
  });

  describe('COUNT', function() {
    return it('returns the count of numeric items', function() {
      COUNT([1, 2, 3]).should.be.exactly(3);
      COUNT([]).should.be.exactly(0);
      shouldHaveNoValue(COUNT(null));
      shouldHaveNoValue(COUNT(void 0));
      shouldHaveNoValue(COUNT({}));
      COUNT([void 0]).should.be.exactly(0);
      COUNT([null]).should.be.exactly(0);
      return COUNT([0]).should.be.exactly(1);
    });
  });

  describe('COUNTA', function() {
    return it('returns the count of items', function() {
      COUNTA([1, 2, 3]).should.be.exactly(3);
      COUNTA(void 0).should.be.exactly(0);
      COUNTA().should.be.exactly(0);
      COUNTA(null).should.be.exactly(0);
      COUNTA(void 0).should.be.exactly(0);
      COUNTA({}).should.be.exactly(0);
      return COUNTA([0]).should.be.exactly(1);
    });
  });

  describe('COUNTBLANK', function() {
    return it('returns the count of blank items', function() {
      COUNTBLANK([1, 2, 3]).should.be.exactly(0);
      COUNTBLANK([1, 2, '']).should.be.exactly(1);
      COUNTBLANK([1, 2, '', void 0]).should.be.exactly(2);
      COUNTBLANK([]).should.be.exactly(0);
      COUNTBLANK(null).should.be.exactly(1);
      COUNTBLANK(void 0).should.be.exactly(1);
      COUNTBLANK({}).should.be.exactly(0);
      COUNTBLANK([void 0]).should.be.exactly(1);
      COUNTBLANK([null]).should.be.exactly(1);
      return COUNTBLANK([0]).should.be.exactly(0);
    });
  });

  describe('DEGREES', function() {
    return it('converts radians to degrees', function() {
      DEGREES(Math.PI).should.be.exactly(180);
      DEGREES(Math.PI + '').should.be.exactly(180);
      DEGREES(Math.PI / 4).should.be.exactly(45);
      DEGREES([]).should.be.NaN();
      DEGREES(void 0).should.be.NaN();
      DEGREES(null).should.be.NaN();
      DEGREES(0/0).should.be.NaN();
      return DEGREES(true).should.be.NaN();
    });
  });

  describe('EVEN', function() {
    return it('returns number rounded up to the nearest even integer', function() {
      EVEN(0).should.be.exactly(0);
      EVEN(1).should.be.exactly(2);
      EVEN(2).should.be.exactly(2);
      EVEN(-1).should.be.exactly(0);
      EVEN(-1.5).should.be.exactly(0);
      EVEN(-2.5).should.be.exactly(-2);
      EVEN(1.5).should.be.exactly(2);
      EVEN(11.5).should.be.exactly(12);
      EVEN(1 / 3).should.be.exactly(2);
      EVEN(void 0).should.be.NaN();
      EVEN(null).should.be.NaN();
      EVEN([]).should.be.NaN();
      EVEN({}).should.be.NaN();
      return EVEN(true).should.be.NaN();
    });
  });

  describe('EXACT', function() {
    return it('checks to see if two text values are identical', function() {
      EXACT('', '').should.be["true"]();
      EXACT('test', 'test').should.be["true"]();
      EXACT(1, 1).should.be["true"]();
      EXACT([], []).should.be["true"]();
      EXACT({}, {}).should.be["true"]();
      EXACT(void 0, void 0).should.be["true"]();
      EXACT(1, void 0).should.be["false"]();
      EXACT(0/0, 0/0).should.be["true"]();
      return EXACT(1, 0/0).should.be["false"]();
    });
  });

  describe('EXISTS', function() {
    return it('checks whether a value exists', function() {
      EXISTS(0).should.be["true"]();
      EXISTS(-1).should.be["true"]();
      EXISTS(true).should.be["true"]();
      EXISTS(false).should.be["true"]();
      EXISTS('test').should.be["true"]();
      EXISTS([1]).should.be["true"]();
      EXISTS({
        test: 1
      }).should.be["true"]();
      EXISTS(1, 2).should.be["true"]();
      EXISTS(1, 2, 'test').should.be["true"]();
      EXISTS(new Date).should.be["true"]();
      EXISTS(/test/).should.be["true"]();
      EXISTS([]).should.be["false"]();
      EXISTS({}).should.be["false"]();
      EXISTS('').should.be["false"]();
      EXISTS(0/0).should.be["false"]();
      EXISTS(null).should.be["false"]();
      EXISTS(void 0).should.be["false"]();
      EXISTS(void 0, null).should.be["false"]();
      return EXISTS(1, null).should.be["false"]();
    });
  });

  describe('FACTDOUBLE', function() {
    return it('returns the double factorial of a number.', function() {
      FACTDOUBLE(0).should.be.exactly(1);
      FACTDOUBLE(1).should.be.exactly(1);
      FACTDOUBLE(2).should.be.exactly(2);
      FACTDOUBLE(3).should.be.exactly(3);
      FACTDOUBLE(4).should.be.exactly(8);
      FACTDOUBLE(7).should.be.exactly(105);
      FACTDOUBLE(20).should.be.exactly(3715891200);
      FACTDOUBLE(-1).should.be.NaN();
      FACTDOUBLE(0/0).should.be.NaN();
      FACTDOUBLE(true).should.be.NaN();
      FACTDOUBLE([]).should.be.NaN();
      FACTDOUBLE({}).should.be.NaN();
      FACTDOUBLE('').should.be.NaN();
      FACTDOUBLE(null).should.be.NaN();
      return FACTDOUBLE(void 0).should.be.NaN();
    });
  });

  describe('FIND', function() {
    return it('find the position of a string in another string', function() {
      FIND('t', 'test').should.be.exactly(1);
      FIND('te', 'test').should.be.exactly(1);
      FIND('test', 'test').should.be.exactly(1);
      FIND('st', 'test').should.be.exactly(3);
      FIND('4', '1234').should.be.exactly(4);
      FIND(4, '1234').should.be.exactly(4);
      FIND('', 'test').should.be.exactly(1);
      FIND('t', 'test', 2).should.be.exactly(4);
      shouldHaveNoValue(FIND('abc', 'def'));
      shouldHaveNoValue(FIND('abc', void 0));
      shouldHaveNoValue(FIND('abc', null));
      shouldHaveNoValue(FIND('abc', 0/0));
      shouldHaveNoValue(FIND('abc', true));
      shouldHaveNoValue(FIND('abc', []));
      shouldHaveNoValue(FIND(null, 'abc'));
      shouldHaveNoValue(FIND(void 0, 'abc'));
      shouldHaveNoValue(FIND(0/0, 'abc'));
      shouldHaveNoValue(FIND([], 'abc'));
      shouldHaveNoValue(FIND({}, 'abc'));
      return shouldHaveNoValue(FIND('t', 'test', 1000));
    });
  });

  describe('FIRST', function() {
    return it('returns the first N items of an array', function() {
      FIRST([1]).should.be.exactly(1);
      FIRST([1, 2, 3]).should.be.exactly(1);
      FIRST('1234').should.be.exactly('1');
      shouldBeUndefined(FIRST(''));
      shouldBeUndefined(FIRST([]));
      shouldBeUndefined(FIRST(1));
      shouldBeUndefined(FIRST(1.337));
      shouldBeUndefined(FIRST(new Date));
      shouldBeUndefined(FIRST(true));
      shouldBeUndefined(FIRST(0/0));
      shouldBeUndefined(FIRST({}));
      shouldBeUndefined(FIRST(null));
      return shouldBeUndefined(FIRST(void 0));
    });
  });

  describe('GCD', function() {
    return it('returns the greatest common divisor of two or more integers', function() {
      GCD(1, 2, 3).should.be.exactly(1);
      GCD(2, 4, 6).should.be.exactly(2);
      GCD(3, 6, 9).should.be.exactly(3);
      GCD(4, 6, 10).should.be.exactly(2);
      GCD('4', '6', '10').should.be.exactly(2);
      GCD(-1, -2, -3).should.be.NaN();
      GCD().should.be.NaN();
      GCD(void 0).should.be.NaN();
      GCD(null).should.be.NaN();
      GCD({}).should.be.NaN();
      GCD([]).should.be.NaN();
      return GCD(true).should.be.NaN();
    });
  });

  describe('GROUP', function() {
    return it('returns the grouped values from the parameters', function() {
      GROUP(1, 2, 3).should.be.eql({
        1: [1],
        2: [2],
        3: [3]
      });
      GROUP(3, 2, 1, 3, 3, 3).should.be.eql({
        1: [1],
        2: [2],
        3: [3, 3, 3, 3]
      });
      GROUP([3, 2, 1, 3, 3, 3]).should.be.eql({
        1: [1],
        2: [2],
        3: [3, 3, 3, 3]
      });
      GROUP(1, 2, 'a').should.be.eql({
        1: [1],
        2: [2],
        a: ['a']
      });
      GROUP(1, 2, 'a', 'a').should.be.eql({
        1: [1],
        2: [2],
        a: ['a', 'a']
      });
      GROUP('a', 'c', 'c', 'b', 'a').should.be.eql({
        a: ['a', 'a'],
        b: ['b'],
        c: ['c', 'c']
      });
      return GROUP(1).should.be.eql({
        1: [1]
      });
    });
  });

  describe('IF', function() {
    return it('evaluates a condition', function() {
      IF(1 > 0, 10, 20).should.be.exactly(10);
      return IF(1 < 0, 10, 20).should.be.exactly(20);
    });
  });

  describe('IFERROR', function() {
    return it('evaluates an error', function() {
      IFERROR(EVEN(null), 'ERR').should.eql('ERR');
      return IFERROR(EVEN(7), 'ERR').should.be.exactly(8);
    });
  });

  describe('INSPECT', function() {
    return it('returns the string representation of a value', function() {
      INSPECT({
        test: 'yes'
      }).should.eql("{ test: 'yes' }");
      INSPECT(null).should.eql('null');
      return INSPECT(void 0).should.eql('undefined');
    });
  });

  describe('ISBLANK', function() {
    return it('tests if a value is blank', function() {
      ISBLANK('').should.be["true"]();
      ISBLANK(null).should.be["true"]();
      ISBLANK(void 0).should.be["true"]();
      ISBLANK(0/0).should.be["true"]();
      ISBLANK([]).should.be["true"]();
      ISBLANK({}).should.be["true"]();
      ISBLANK({
        test: 1
      }).should.be["false"]();
      ISBLANK(7).should.be["false"]();
      ISBLANK(true).should.be["false"]();
      ISBLANK('test').should.be["false"]();
      ISBLANK(new Date).should.be["false"]();
      ISBLANK({
        choice_values: null
      }).should.be["true"]();
      ISBLANK({
        choice_values: []
      }).should.be["true"]();
      ISBLANK({
        choice_values: [],
        other_values: []
      }).should.be["true"]();
      ISBLANK({
        choice_values: [],
        other_values: null
      }).should.be["true"]();
      ISBLANK({
        choice_values: null,
        other_values: null
      }).should.be["true"]();
      ISBLANK({
        choice_values: null,
        other_values: []
      }).should.be["true"]();
      ISBLANK({
        other_values: null
      }).should.be["true"]();
      ISBLANK({
        choice_values: ['a'],
        other_values: []
      }).should.be["false"]();
      ISBLANK({
        choice_values: ['a'],
        other_values: ['b']
      }).should.be["false"]();
      ISBLANK({
        choice_values: [],
        other_values: ['b']
      }).should.be["false"]();
      return ISBLANK({
        choice_values: null,
        other_values: ['b']
      }).should.be["false"]();
    });
  });

  describe('ISERR', function() {
    return it('tests for an error', function() {
      ISERR(EVEN(null)).should.be["true"]();
      ISERR(EVEN(7)).should.be["false"]();
      return ISERR(new Error).should.be["true"]();
    });
  });

  describe('ISLOGICAL', function() {
    return it('tests for a logical value', function() {
      ISLOGICAL(true).should.be["true"]();
      ISLOGICAL(false).should.be["true"]();
      return ISLOGICAL('').should.be["false"]();
    });
  });

  describe('ISNONTEXT', function() {
    return it('tests for a non-text value', function() {
      ISNONTEXT(true).should.be["true"]();
      ISNONTEXT(false).should.be["true"]();
      return ISNONTEXT('').should.be["false"]();
    });
  });

  describe('ISNUMBER', function() {
    return it('tests for a number value', function() {
      ISNUMBER(1).should.be["true"]();
      ISNUMBER('1').should.be["true"]();
      return ISNUMBER(true).should.be["false"]();
    });
  });

  describe('ISODD', function() {
    return it('tests for an odd number', function() {
      ISODD(0).should.be["false"]();
      ISODD(1).should.be["true"]();
      ISODD(2).should.be["false"]();
      ISODD('1').should.be["true"]();
      ISODD(true).should.be["false"]();
      ISODD(false).should.be["false"]();
      ISODD(void 0).should.be["false"]();
      return ISODD(null).should.be["false"]();
    });
  });

  describe('ISEVEN', function() {
    return it('tests for an even number', function() {
      ISEVEN(0).should.be["true"]();
      ISEVEN(1).should.be["false"]();
      ISEVEN(2).should.be["true"]();
      ISEVEN('2').should.be["true"]();
      ISEVEN(true).should.be["false"]();
      ISEVEN(false).should.be["false"]();
      ISEVEN(void 0).should.be["false"]();
      return ISEVEN(null).should.be["false"]();
    });
  });

  describe('ISTEXT', function() {
    return it('tests for a text value', function() {
      ISTEXT(true).should.be["false"]();
      ISTEXT(false).should.be["false"]();
      return ISTEXT('').should.be["true"]();
    });
  });

  describe('LABEL', function() {
    return it('returns the label of a field', function() {
      LABEL('name').should.be.exactly('Name');
      return shouldBeUndefined(LABEL('invalid_field'));
    });
  });

  describe('LAST', function() {
    return it('returns the last N items of an array', function() {
      LAST([1]).should.be.exactly(1);
      LAST([1, 2, 3]).should.be.exactly(3);
      LAST('1234').should.be.exactly('4');
      shouldBeUndefined(LAST(''));
      shouldBeUndefined(LAST([]));
      shouldBeUndefined(LAST(1));
      shouldBeUndefined(LAST(1.337));
      shouldBeUndefined(LAST(new Date));
      shouldBeUndefined(LAST(true));
      shouldBeUndefined(LAST(0/0));
      shouldBeUndefined(LAST({}));
      shouldBeUndefined(LAST(null));
      return shouldBeUndefined(LAST(void 0));
    });
  });

  describe('LCM', function() {
    return it('returns the least common multiple', function() {
      LCM(-50, 25, -45, -18, 90, 447).should.be.exactly(67050);
      LCM('-50', 25, -45, -18, 90, '447').should.be.exactly(67050);
      LCM(-50, 25, -45, -18, 90, null).should.be.NaN();
      LCM(-50, 25, -45, -18, 90, 0/0).should.be.NaN();
      LCM(1.3, 2.5).should.be.exactly(2);
      LCM('1.3', '2.5').should.be.exactly(2);
      LCM(void 0).should.be.NaN();
      LCM(null).should.be.NaN();
      LCM(true).should.be.NaN();
      LCM('').should.be.NaN();
      return LCM(new Date).should.be.NaN();
    });
  });

  describe('LEFT', function() {
    return it('returns the left characters of a string', function() {
      LEFT('abc', 1).should.eql('a');
      LEFT('abc', 1.9).should.eql('a');
      LEFT('abc', '1').should.eql('a');
      LEFT('abc').should.eql('a');
      LEFT('abc', 2).should.eql('ab');
      LEFT('abc', 1000).should.eql('abc');
      LEFT('', 1000).should.eql('');
      LEFT(7000, 2).should.eql('70');
      LEFT(true, 4).should.eql('true');
      shouldHaveNoValue(LEFT('abc', -1));
      shouldHaveNoValue(LEFT('abc', '-1'));
      shouldHaveNoValue(LEFT({}, 4));
      shouldHaveNoValue(LEFT({}));
      shouldHaveNoValue(LEFT(void 0));
      shouldHaveNoValue(LEFT(null));
      return shouldHaveNoValue(LEFT(new Date));
    });
  });

  describe('LEN', function() {
    return it('returns the length of a string', function() {
      LEN('abc').should.be.exactly(3);
      LEN('').should.be.exactly(0);
      LEN(true).should.be.exactly(4);
      LEN(false).should.be.exactly(5);
      LEN(800).should.be.exactly(3);
      LEN(-800).should.be.exactly(4);
      LEN(-1 / 3).should.be.exactly(19);
      LEN(void 0).should.be.exactly(0);
      LEN(null).should.be.exactly(0);
      LEN(0/0).should.be.exactly(0);
      LEN([]).should.be.exactly(0);
      LEN([1]).should.be.exactly(1);
      LEN([1, 2, 3]).should.be.exactly(3);
      LEN([1, 2, 3, null]).should.be.exactly(4);
      LEN({}).should.be.exactly(0);
      LEN({
        key1: 1
      }).should.be.exactly(1);
      LEN({
        key1: 1,
        key2: 2
      }).should.be.exactly(2);
      LEN(new Date).should.be.exactly((new Date).toString().length);
      return LEN(/test/).should.be.exactly(6);
    });
  });

  describe('LN', function() {
    return it('returns the natural logarithm of a number', function() {
      LN(0).should.be.exactly(-2e308);
      LN(1).should.be.exactly(0);
      LN(100).should.be.exactly(4.605170185988092);
      LN('100').should.be.exactly(4.605170185988092);
      LN('abc').should.be.NaN();
      LN(-100).should.be.NaN();
      LN('').should.be.NaN();
      LN([]).should.be.NaN();
      LN({}).should.be.NaN();
      LN(true).should.be.NaN();
      LN(void 0).should.be.NaN();
      LN(null).should.be.NaN();
      return LN(new Date).should.be.NaN();
    });
  });

  describe('LOG', function() {
    return it('returns the logarithm of a number with the given base', function() {
      LOG(0).should.be.exactly(-2e308);
      LOG(1).should.be.exactly(0);
      LOG(100).should.be.exactly(2);
      LOG(1 / 3).should.be.exactly(-0.47712125471966244);
      LOG('100').should.be.exactly(2);
      LOG('abc').should.be.NaN();
      LOG(-100).should.be.NaN();
      LOG('').should.be.NaN();
      LOG([]).should.be.NaN();
      LOG({}).should.be.NaN();
      LOG(true).should.be.NaN();
      LOG(void 0).should.be.NaN();
      LOG(null).should.be.NaN();
      return LOG(new Date).should.be.NaN();
    });
  });

  describe('LOG10', function() {
    return it('returns the logarithm of a number with 10 as the base', function() {
      LOG10(0).should.be.exactly(-2e308);
      LOG10(1).should.be.exactly(0);
      LOG10(100).should.be.exactly(2);
      LOG10(1 / 3).should.be.exactly(-0.47712125471966244);
      LOG10('100').should.be.exactly(2);
      LOG10('abc').should.be.NaN();
      LOG10(-100).should.be.NaN();
      LOG10('').should.be.NaN();
      LOG10([]).should.be.NaN();
      LOG10({}).should.be.NaN();
      LOG10(true).should.be.NaN();
      LOG10(void 0).should.be.NaN();
      LOG10(null).should.be.NaN();
      return LOG10(new Date).should.be.NaN();
    });
  });

  describe('LOWER', function() {
    return it('returns the string as lower case', function() {
      LOWER('ABC').should.eql('abc');
      LOWER('abc').should.eql('abc');
      LOWER('1A').should.eql('1a');
      LOWER(100).should.eql('100');
      LOWER('').should.eql('');
      LOWER(true).should.eql('true');
      shouldHaveNoValue(LOWER([]));
      shouldHaveNoValue(LOWER({}));
      shouldHaveNoValue(LOWER(void 0));
      shouldHaveNoValue(LOWER(null));
      return shouldHaveNoValue(LOWER(new Date));
    });
  });

  describe('MAX', function() {
    return it('returns the maximum number in a list of numbers', function() {
      MAX(1, 2, 3).should.be.exactly(3);
      MAX('1', '2', '3').should.be.exactly(3);
      MAX('1.11', '2.22', '3.33').should.be.exactly(3.33);
      MAX(-1, -2, -3).should.be.exactly(-1);
      MAX(-1, [-2, 5], -3).should.be.exactly(5);
      shouldHaveNoValue(MAX([]));
      shouldHaveNoValue(MAX({}));
      shouldHaveNoValue(MAX(void 0));
      shouldHaveNoValue(MAX(null));
      shouldHaveNoValue(MAX(new Date));
      shouldHaveNoValue(MAX(0/0, -2, -3));
      shouldHaveNoValue(MAX());
      return shouldHaveNoValue(MAX(3, 4, 5, 'Test'));
    });
  });

  describe('MAXA', function() {
    return it('returns the maximum number in a list of numbers', function() {
      MAXA([1, 2, 3]).should.be.exactly(3);
      MAXA(['1', '2', '3']).should.be.exactly(3);
      MAXA(['1.11', '2.22', '3.33']).should.be.exactly(3.33);
      MAXA([-1, -2, -3]).should.be.exactly(-1);
      shouldHaveNoValue(MAXA([]));
      shouldHaveNoValue(MAXA({}));
      shouldHaveNoValue(MAXA(void 0));
      shouldHaveNoValue(MAXA(null));
      shouldHaveNoValue(MAXA(new Date));
      shouldHaveNoValue(MAXA(0/0, -2, -3));
      shouldHaveNoValue(MAXA());
      return shouldHaveNoValue(MAXA([3, 4, 5, 'Test']));
    });
  });

  describe('MEDIAN', function() {
    return it('returns the median number in a list of numbers', function() {
      MEDIAN(1, 2, 3).should.be.exactly(2);
      MEDIAN(2, 3, 3, 5, 7, 10).should.be.exactly(4);
      MEDIAN(2, 3, [3, 5], 7, 10).should.be.exactly(4);
      MEDIAN(10, 3, 7, 5, 3, 2).should.be.exactly(4);
      MEDIAN(10, 3, 5, 3, 2).should.be.exactly(3);
      MEDIAN('1.11', '2.22', '3.33').should.be.exactly(2.22);
      MEDIAN(-1, -2, -3).should.be.exactly(-2);
      shouldHaveNoValue(MEDIAN([]));
      shouldHaveNoValue(MEDIAN({}));
      shouldHaveNoValue(MEDIAN(void 0));
      shouldHaveNoValue(MEDIAN(null));
      shouldHaveNoValue(MEDIAN(new Date));
      shouldHaveNoValue(MEDIAN(0/0, -2, -3));
      return shouldHaveNoValue(MEDIAN());
    });
  });

  describe('MIN', function() {
    return it('returns the minimum number in a list of numbers', function() {
      MIN(1, 2, 3).should.be.exactly(1);
      MIN([1], 2, 3).should.be.exactly(1);
      MIN('1', '2', '3').should.be.exactly(1);
      MIN('1.11', '2.22', '3.33').should.be.exactly(1.11);
      MIN(-1, -2, -3).should.be.exactly(-3);
      shouldHaveNoValue(MIN([]));
      shouldHaveNoValue(MIN({}));
      shouldHaveNoValue(MIN(void 0));
      shouldHaveNoValue(MIN(null));
      shouldHaveNoValue(MIN(new Date));
      shouldHaveNoValue(MIN(0/0, -2, -3));
      return shouldHaveNoValue(MIN());
    });
  });

  describe('MINA', function() {
    return it('returns the minium number in a list of numbers', function() {
      MINA([1, 2, 3]).should.be.exactly(1);
      MINA(['1', '2', '3']).should.be.exactly(1);
      MINA(['1.11', '2.22', '3.33']).should.be.exactly(1.11);
      MINA([-1, -2, -3]).should.be.exactly(-3);
      shouldHaveNoValue(MINA([]));
      shouldHaveNoValue(MINA({}));
      shouldHaveNoValue(MINA(void 0));
      shouldHaveNoValue(MINA(null));
      shouldHaveNoValue(MINA(new Date));
      shouldHaveNoValue(MINA(0/0, -2, -3));
      return shouldHaveNoValue(MINA());
    });
  });

  describe('MID', function() {
    return it('returns a specific number of characters from a text string', function() {
      MID('abc', 3, 1).should.eql('c');
      MID('abc', 2, 2).should.eql('bc');
      MID('abc', 1, 3).should.eql('abc');
      MID('abc', 1, 2).should.eql('ab');
      MID('abc', 4, 2).should.eql('');
      MID('abc', 2, 9).should.eql('bc');
      MID('abc', '1', '3').should.eql('abc');
      MID(777, '1', '1').should.eql('7');
      MID(true, '1', '1').should.eql('t');
      shouldHaveNoValue(MID('abc', 1, -1));
      shouldHaveNoValue(MID('abc', -1, 1));
      shouldHaveNoValue(MID('abc'));
      shouldHaveNoValue(MID([]));
      shouldHaveNoValue(MID({}));
      shouldHaveNoValue(MID(void 0));
      shouldHaveNoValue(MID(null));
      shouldHaveNoValue(MID(new Date));
      shouldHaveNoValue(MID(0/0));
      return shouldHaveNoValue(MID());
    });
  });

  describe('MOD', function() {
    return it('returns the modulus', function() {
      MOD(10, 2).should.be.exactly(0);
      MOD(11, 2).should.be.exactly(1);
      MOD(12.5, 2).should.be.exactly(0.5);
      MOD(11 / 3, 2).should.be.exactly(1.6666666666666665);
      MOD('11', '2').should.be.exactly(1);
      MOD(1, 0).should.be.NaN();
      MOD(0/0).should.be.NaN();
      MOD(void 0).should.be.NaN();
      MOD(null).should.be.NaN();
      MOD(true).should.be.NaN();
      MOD(new Date).should.be.NaN();
      return MOD().should.be.NaN();
    });
  });

  describe('NOT', function() {
    return it('returns the negation of a value', function() {
      NOT(false).should.be["true"]();
      NOT(true).should.be["false"]();
      NOT(1).should.be["false"]();
      NOT(0/0).should.be["true"]();
      NOT(void 0).should.be["true"]();
      NOT(null).should.be["true"]();
      NOT(new Date).should.be["false"]();
      return NOT().should.be["true"]();
    });
  });

  describe('ODD', function() {
    return it('returns the next odd number', function() {
      ODD(0).should.be.exactly(1);
      ODD(1).should.be.exactly(1);
      ODD(2).should.be.exactly(3);
      ODD(-1).should.be.exactly(-1);
      ODD(-2).should.be.exactly(-3);
      ODD(-3).should.be.exactly(-3);
      ODD(true).should.be.NaN();
      ODD([]).should.be.NaN();
      ODD({}).should.be.NaN();
      ODD(0/0).should.be.NaN();
      ODD(void 0).should.be.NaN();
      ODD(null).should.be.NaN();
      ODD(new Date).should.be.NaN();
      return ODD().should.be.NaN();
    });
  });

  describe('OPENEXTENSION', function() {
    it('accepts a url', function() {
      OPENEXTENSION({
        url: 'https://test.com',
        onMessage: function() {}
      });
      return JSON.parse(runtime.results[0].value).url.should.eql('https://test.com');
    });
    it('requires a url', function() {
      return (function() {
        return OPENEXTENSION({});
      }).should["throw"]('url must be provided');
    });
    return it('requires an onMessage handler', function() {
      return (function() {
        return OPENEXTENSION({
          url: 'https://test.com'
        });
      }).should["throw"]('onMessage function must be provided');
    });
  });

  describe('OR', function() {
    return it('returns true if any argument is truthy', function() {
      OR(true, false).should.be["true"]();
      OR(true, true).should.be["true"]();
      OR(false, true).should.be["true"]();
      OR(false, false).should.be["false"]();
      OR(1, 0).should.be["true"]();
      OR(0, 0).should.be["false"]();
      OR(true).should.be["true"]();
      OR(false).should.be["false"]();
      OR(void 0).should.be["false"]();
      OR(null).should.be["false"]();
      OR(0/0).should.be["false"]();
      OR(new Date).should.be["true"]();
      OR([]).should.be["true"]();
      return OR({}).should.be["true"]();
    });
  });

  describe('PI', function() {
    return it('returns PI', function() {
      return PI().should.eql(Math.PI);
    });
  });

  describe('POWER', function() {
    return it('returns the result of a number raised to a power', function() {
      POWER(2, 3).should.be.exactly(8);
      POWER(-2, 3).should.be.exactly(-8);
      POWER(-2, 3.1).should.be.NaN();
      POWER('-2', '3').should.be.exactly(-8);
      POWER(1, 0).should.be.exactly(1);
      POWER(0/0).should.be.NaN();
      POWER(void 0).should.be.NaN();
      POWER(null).should.be.NaN();
      POWER(true).should.be.NaN();
      POWER(new Date).should.be.NaN();
      return POWER().should.be.NaN();
    });
  });

  describe('PRODUCT', function() {
    return it('multiplies all the numbers given as arguments', function() {
      PRODUCT(2, 3, 4).should.be.exactly(24);
      PRODUCT(-2, 3, 4).should.be.exactly(-24);
      PRODUCT(-2, 3.1, 1.7).should.be.exactly(-10.54);
      PRODUCT('-2', '3').should.be.exactly(-6);
      PRODUCT(1, 0).should.be.exactly(0);
      PRODUCT(1, 0/0).should.be.NaN();
      PRODUCT(void 0).should.be.NaN();
      PRODUCT(null).should.be.NaN();
      PRODUCT(true).should.be.NaN();
      PRODUCT(new Date).should.be.NaN();
      return PRODUCT().should.be.NaN();
    });
  });

  describe('PROJECTID', function() {
    return it('returns the project ID', function() {
      return PROJECTID().should.be.exactly('88eb3511-13d8-4666-b188-8108019d0984');
    });
  });

  describe('PROJECTNAME', function() {
    return it('returns the project name', function() {
      return PROJECTNAME().should.be.exactly('Project X');
    });
  });

  describe('PROPER', function() {
    return it('capitalizes the first letter in a text string', function() {
      PROPER('ABC').should.eql('Abc');
      PROPER('Abc').should.eql('Abc');
      PROPER('abc').should.eql('Abc');
      PROPER('test test').should.eql('Test Test');
      PROPER('TEST TEST').should.eql('Test Test');
      PROPER('Test Test').should.eql('Test Test');
      PROPER('1A').should.eql('1a');
      PROPER(100).should.eql('100');
      PROPER('').should.eql('');
      PROPER(true).should.eql('True');
      shouldHaveNoValue(PROPER([]));
      shouldHaveNoValue(PROPER({}));
      shouldHaveNoValue(PROPER(void 0));
      shouldHaveNoValue(PROPER(null));
      return shouldHaveNoValue(PROPER(new Date));
    });
  });

  describe('QUOTIENT', function() {
    return it('returns the quotient', function() {
      QUOTIENT(10, 2).should.be.exactly(5);
      QUOTIENT(11, 2).should.be.exactly(5);
      QUOTIENT(12.5, 2).should.be.exactly(6);
      QUOTIENT(11 / 3, 2).should.be.exactly(1);
      QUOTIENT('11', '2').should.be.exactly(5);
      QUOTIENT(1, 0).should.be.NaN();
      QUOTIENT(0/0).should.be.NaN();
      QUOTIENT(void 0).should.be.NaN();
      QUOTIENT(null).should.be.NaN();
      QUOTIENT(true).should.be.NaN();
      QUOTIENT(new Date).should.be.NaN();
      return QUOTIENT().should.be.NaN();
    });
  });

  describe('RADIANS', function() {
    return it('converts degrees to radians', function() {
      RADIANS(45).should.be.exactly(Math.PI / 4);
      RADIANS(90).should.be.exactly(Math.PI / 2);
      RADIANS(180).should.be.exactly(Math.PI);
      RADIANS(360).should.be.exactly(Math.PI * 2);
      RADIANS(-45).should.be.exactly(-Math.PI / 4);
      RADIANS([]).should.be.NaN();
      RADIANS(void 0).should.be.NaN();
      RADIANS(null).should.be.NaN();
      RADIANS(0/0).should.be.NaN();
      return RADIANS(true).should.be.NaN();
    });
  });

  describe('RAND', function() {
    return it('returns a random number between 0 and 1', function() {
      return RAND().should.be.above(0).and.below(1);
    });
  });

  describe('RANDBETWEEN', function() {
    return it('returns a random integer between low and high', function() {
      RANDBETWEEN(5, 10).should.be.above(4).and.below(11);
      RANDBETWEEN('5', '10').should.be.above(4).and.below(11);
      RANDBETWEEN(0/0, 6).should.be.NaN();
      RANDBETWEEN(null).should.be.NaN();
      RANDBETWEEN(void 0).should.be.NaN();
      RANDBETWEEN(true).should.be.NaN();
      RANDBETWEEN([]).should.be.NaN();
      RANDBETWEEN({}).should.be.NaN();
      return RANDBETWEEN(new Date).should.be.NaN();
    });
  });

  describe('REPLACE', function() {
    return it('replace characters in a string', function() {
      REPLACE('abc', 3, 1, 'd').should.eql('abd');
      REPLACE('abc', 2, 2, 'd').should.eql('ad');
      REPLACE('abc', 1, 3, 'd').should.eql('d');
      REPLACE('abc', 1, 2, 'd').should.eql('dc');
      REPLACE('abc', 4, 2, 'd').should.eql('abcd');
      REPLACE('abc', 2, 9, 'd').should.eql('ad');
      REPLACE('abc', '1', '3', 'd').should.eql('d');
      REPLACE(777, '1', '1', 'd').should.eql('d77');
      REPLACE(true, '1', '1', 'd').should.eql('drue');
      shouldHaveNoValue(REPLACE('abc', 1, -1, 'd'));
      shouldHaveNoValue(REPLACE('abc', -1, 1, 'd'));
      shouldHaveNoValue(REPLACE('abc'));
      shouldHaveNoValue(REPLACE([]));
      shouldHaveNoValue(REPLACE({}));
      shouldHaveNoValue(REPLACE(void 0));
      shouldHaveNoValue(REPLACE(null));
      shouldHaveNoValue(REPLACE(new Date));
      shouldHaveNoValue(REPLACE(0/0));
      return shouldHaveNoValue(REPLACE());
    });
  });

  describe('RIGHT', function() {
    return it('returns the right characters of a string', function() {
      RIGHT('abc', 1).should.eql('c');
      RIGHT('abc', 1.9).should.eql('c');
      RIGHT('abc', '1').should.eql('c');
      RIGHT('abc').should.eql('c');
      RIGHT('abc', 2).should.eql('bc');
      RIGHT('abc', 1000).should.eql('abc');
      RIGHT('', 1000).should.eql('');
      RIGHT(7000, 2).should.eql('00');
      RIGHT(true, 4).should.eql('true');
      shouldHaveNoValue(RIGHT('abc', -1));
      shouldHaveNoValue(RIGHT('abc', '-1'));
      shouldHaveNoValue(RIGHT({}, 4));
      shouldHaveNoValue(RIGHT({}));
      shouldHaveNoValue(RIGHT(void 0));
      shouldHaveNoValue(RIGHT(null));
      return shouldHaveNoValue(RIGHT(new Date));
    });
  });

  describe('ROUNDDOWN', function() {
    return it('round down the given number to the specified number of digits', function() {
      ROUNDDOWN(1).should.be.exactly(1);
      ROUNDDOWN(1.5).should.be.exactly(1);
      ROUNDDOWN(2.5).should.be.exactly(2);
      ROUNDDOWN('2.5').should.be.exactly(2);
      ROUNDDOWN('test').should.be.NaN();
      ROUNDDOWN(2.6666666, 4).should.be.exactly(2.6666);
      ROUNDDOWN(-2.6666666, 4).should.be.exactly(-2.6666);
      ROUNDDOWN(2.6666666, 7).should.be.exactly(2.6666666);
      ROUNDDOWN(2.6666666, 8).should.be.exactly(2.6666666);
      ROUNDDOWN(1 / 3, 7).should.be.exactly(0.3333333);
      ROUNDDOWN(0/0).should.be.NaN();
      ROUNDDOWN(void 0).should.be.NaN();
      ROUNDDOWN(null).should.be.NaN();
      ROUNDDOWN(new Date).should.be.NaN();
      ROUNDDOWN([]).should.be.NaN();
      return ROUNDDOWN({}).should.be.NaN();
    });
  });

  describe('ROUNDUP', function() {
    return it('round up the given number to the specified number of digits', function() {
      ROUNDUP(1).should.be.exactly(1);
      ROUNDUP(1.5).should.be.exactly(2);
      ROUNDUP(2.5).should.be.exactly(3);
      ROUNDUP('2.5').should.be.exactly(3);
      ROUNDUP('test').should.be.NaN();
      ROUNDUP(2.6666666, 4).should.be.exactly(2.6667);
      ROUNDUP(-2.6666666, 4).should.be.exactly(-2.6667);
      ROUNDUP(2.6666666, 7).should.be.exactly(2.6666666);
      ROUNDUP(2.6666666, 8).should.be.exactly(2.6666666);
      ROUNDUP(1 / 3, 7).should.be.exactly(0.3333334);
      ROUNDUP(0/0).should.be.NaN();
      ROUNDUP(void 0).should.be.NaN();
      ROUNDUP(null).should.be.NaN();
      ROUNDUP(new Date).should.be.NaN();
      ROUNDUP([]).should.be.NaN();
      return ROUNDUP({}).should.be.NaN();
    });
  });

  describe('SEARCH', function() {
    return it('locate one text string within a second text string', function() {
      SEARCH('t', 'test').should.be.exactly(1);
      SEARCH('te', 'test').should.be.exactly(1);
      SEARCH('test', 'test').should.be.exactly(1);
      SEARCH('st', 'test').should.be.exactly(3);
      SEARCH('4', '1234').should.be.exactly(4);
      SEARCH(4, '1234').should.be.exactly(4);
      SEARCH('', 'test').should.be.exactly(1);
      SEARCH('t', 'test', 2).should.be.exactly(4);
      shouldHaveNoValue(SEARCH('abc', 'def'));
      shouldHaveNoValue(SEARCH('abc', void 0));
      shouldHaveNoValue(SEARCH('abc', null));
      shouldHaveNoValue(SEARCH('abc', 0/0));
      shouldHaveNoValue(SEARCH('abc', true));
      shouldHaveNoValue(SEARCH('abc', []));
      shouldHaveNoValue(SEARCH(null, 'abc'));
      shouldHaveNoValue(SEARCH(void 0, 'abc'));
      shouldHaveNoValue(SEARCH(0/0, 'abc'));
      shouldHaveNoValue(SEARCH([], 'abc'));
      shouldHaveNoValue(SEARCH({}, 'abc'));
      return shouldHaveNoValue(SEARCH('t', 'test', 1000));
    });
  });

  describe('SIGN', function() {
    return it('return the sign of a number', function() {
      SIGN(0).should.be.exactly(0);
      SIGN(1).should.be.exactly(1);
      SIGN(1.5).should.be.exactly(1);
      SIGN(-1.5).should.be.exactly(-1);
      SIGN('2.5').should.be.exactly(1);
      SIGN('test').should.be.NaN();
      SIGN(0/0).should.be.NaN();
      SIGN(void 0).should.be.NaN();
      SIGN(null).should.be.NaN();
      SIGN(new Date).should.be.NaN();
      SIGN([]).should.be.NaN();
      return SIGN({}).should.be.NaN();
    });
  });

  describe('SQRT', function() {
    return it('return the square root of a number', function() {
      SQRT(4).should.be.exactly(2);
      SQRT(9).should.be.exactly(3);
      SQRT('9').should.be.exactly(3);
      SQRT(-1).should.be.NaN();
      SQRT(0/0).should.be.NaN();
      SQRT(void 0).should.be.NaN();
      SQRT(null).should.be.NaN();
      SQRT(new Date).should.be.NaN();
      SQRT([]).should.be.NaN();
      return SQRT({}).should.be.NaN();
    });
  });

  describe('SQRTPI', function() {
    return it('return the square root of a number times PI', function() {
      SQRTPI(4).should.be.exactly(3.5449077018110318);
      SQRTPI(9).should.be.exactly(5.317361552716548);
      SQRTPI('9').should.be.exactly(5.317361552716548);
      SQRTPI(-1).should.be.NaN();
      SQRTPI(0/0).should.be.NaN();
      SQRTPI(void 0).should.be.NaN();
      SQRTPI(null).should.be.NaN();
      SQRTPI(new Date).should.be.NaN();
      SQRTPI([]).should.be.NaN();
      return SQRTPI({}).should.be.NaN();
    });
  });

  describe('SUBSTITUTE', function() {
    return it('substitutes text in a text string', function() {
      SUBSTITUTE('abc abc abc', 'abc', 'def').should.eql('def def def');
      SUBSTITUTE('abc abc abc', 'xyz', 'def').should.eql('abc abc abc');
      SUBSTITUTE('abc abc ghi', 'abc', 'def').should.eql('def def ghi');
      SUBSTITUTE('ABC abc ghi', 'abc', 'def').should.eql('ABC def ghi');
      SUBSTITUTE('abc abc abc', 'abc', 'def', 1).should.eql('def abc abc');
      SUBSTITUTE('abc abc abc', 'abc', 'def', 2).should.eql('abc def abc');
      SUBSTITUTE('abc abc abc', 'abc', 'def', 3).should.eql('abc abc def');
      SUBSTITUTE('abc abc abc', 'abc', 'def', 4).should.eql('abc abc abc');
      SUBSTITUTE('def def def', 'abc', 'def', 2).should.eql('def def def');
      SUBSTITUTE('777', '7', '8', 2).should.eql('787');
      shouldHaveNoValue(SUBSTITUTE('abc abc abc', 'abc', 'def', -1));
      shouldHaveNoValue(SUBSTITUTE(null, 'abc', 'def', 1));
      shouldHaveNoValue(SUBSTITUTE('abc', null, 'def', 1));
      shouldHaveNoValue(SUBSTITUTE('abc', null, null, 1));
      shouldHaveNoValue(SUBSTITUTE(void 0));
      shouldHaveNoValue(SUBSTITUTE(null));
      shouldHaveNoValue(SUBSTITUTE(new Date));
      shouldHaveNoValue(SUBSTITUTE([]));
      shouldHaveNoValue(SUBSTITUTE({}));
      shouldHaveNoValue(SUBSTITUTE(0/0));
      return shouldHaveNoValue(SUBSTITUTE());
    });
  });

  describe('SUM', function() {
    return it('sum all the numbers given as arguments', function() {
      SUM(2, 3, 4).should.be.exactly(9);
      SUM(-2, 3, 4).should.be.exactly(5);
      SUM(-2, 3.1, 1.7).should.be.exactly(2.8);
      SUM(-2, [3.1], 1.7).should.be.exactly(2.8);
      SUM([-2, 3.1, 1.7]).should.be.exactly(2.8);
      SUM([-2, 3.1, [1.7]]).should.be.exactly(2.8);
      SUM('-2', '3').should.be.exactly(1);
      SUM(1, 0).should.be.exactly(1);
      SUM(1, 0/0).should.be.NaN();
      SUM(void 0).should.be.NaN();
      SUM(null).should.be.NaN();
      SUM(true).should.be.NaN();
      SUM(new Date).should.be.NaN();
      return SUM().should.be.NaN();
    });
  });

  describe('SUMSQ', function() {
    return it('sum all the squares of numbers given as arguments', function() {
      SUMSQ(2, 3, 4).should.be.exactly(29);
      SUMSQ(-2, 3, 4).should.be.exactly(29);
      SUMSQ(-2, 3.1, 1.7).should.be.exactly(16.5);
      SUMSQ(-2, [3.1, [1.7]]).should.be.exactly(16.5);
      SUMSQ('-2', '3').should.be.exactly(13);
      SUMSQ(1, 0).should.be.exactly(1);
      SUMSQ(1, 0/0).should.be.NaN();
      SUMSQ(void 0).should.be.NaN();
      SUMSQ(null).should.be.NaN();
      SUMSQ(true).should.be.NaN();
      SUMSQ(new Date).should.be.NaN();
      return SUMSQ().should.be.NaN();
    });
  });

  describe('T', function() {
    return it('converts argument to text', function() {
      T('test').should.eql('test');
      T(void 0).should.eql('');
      return T(null).should.eql('');
    });
  });

  describe('TIMESTAMP', function() {
    return it('returns a timestamp value', function() {
      TIMESTAMP().length.should.eql(19);
      return TIMESTAMP(new Date('December 16, 1982 03:24:00')).should.be.exactly('1982-12-16 03:24:00');
    });
  });

  describe('TRIM', function() {
    return it('trim whitespace from a string', function() {
      TRIM('test').should.eql('test');
      TRIM(' test ').should.eql('test');
      TRIM(void 0).should.eql('');
      return TRIM(null).should.eql('');
    });
  });

  describe('TYPEOF', function() {
    return it('returns the type of a variable', function() {
      TYPEOF(null).should.eql('null');
      TYPEOF(void 0).should.eql('undefined');
      TYPEOF('test').should.eql('string');
      TYPEOF(1).should.eql('number');
      TYPEOF(0/0).should.eql('nan');
      TYPEOF(new Date).should.eql('date');
      TYPEOF(function() {}).should.eql('function');
      TYPEOF(true).should.eql('boolean');
      TYPEOF(/test/).should.eql('regexp');
      TYPEOF({}).should.eql('object');
      TYPEOF([]).should.eql('array');
      return TYPEOF(arguments).should.eql('object');
    });
  });

  describe('UPPER', function() {
    return it('returns the string as upper case', function() {
      UPPER('ABC').should.eql('ABC');
      UPPER('abc').should.eql('ABC');
      UPPER('1a').should.eql('1A');
      UPPER(100).should.eql('100');
      UPPER('').should.eql('');
      UPPER(true).should.eql('TRUE');
      shouldHaveNoValue(UPPER([]));
      shouldHaveNoValue(UPPER({}));
      shouldHaveNoValue(UPPER(void 0));
      shouldHaveNoValue(UPPER(null));
      return shouldHaveNoValue(UPPER(new Date));
    });
  });

  describe('ISSELECTED', function() {
    return it('returns true if a choice value is selected', function() {
      ISSELECTED({
        choice_values: ['test']
      }, 'test').should.be["true"]();
      ISSELECTED({
        choice_values: ['1', '2']
      }, '1').should.be["true"]();
      ISSELECTED({
        choice_values: ['1', '2']
      }, ['1', '2']).should.be["true"]();
      ISSELECTED({
        choice_values: ['1', '2']
      }, ['1', '2', '3']).should.be["false"]();
      ISSELECTED({
        other_values: ['test']
      }, 'test').should.be["true"]();
      ISSELECTED({
        other_values: []
      }, 'test').should.be["false"]();
      ISSELECTED({
        other_values: null
      }, 'test').should.be["false"]();
      ISSELECTED().should.be["false"]();
      ISSELECTED(null).should.be["false"]();
      ISSELECTED({
        choice_values: ['1']
      }).should.be["false"]();
      ISSELECTED({
        choice_values: ['1'],
        other_values: ['2']
      }, '1').should.be["true"]();
      return ISSELECTED({
        choice_values: ['1'],
        other_values: ['2']
      }, '2').should.be["true"]();
    });
  });

  describe('CONFIG', function() {
    return it('returns the current config', function() {
      CONFIGURE({
        decimalSeparator: '.'
      });
      return CONFIG().decimalSeparator.should.eql('.');
    });
  });

  describe('FIELD', function() {
    return it('returns the fields', function() {
      FIELD('name').label.should.eql('Name');
      FIELD('items').type.should.eql('Repeatable');
      return shouldHaveNoValue(FIELD('does_not_exist'));
    });
  });

  describe('FIELDS', function() {
    return it('returns the child fields', function() {
      shouldHaveNoValue(FIELDS('does_not_exist'));
      shouldHaveNoValue(FIELDS('name'));
      FIELDS('items').length.should.eql(6);
      return FIELDS('items', {
        repeatables: false
      }).length.should.eql(3);
    });
  });

  describe('FIELDNAMES', function() {
    return it('returns the child field names', function() {
      shouldHaveNoValue(FIELDNAMES('does_not_exist'));
      shouldHaveNoValue(FIELDNAMES('name'));
      FIELDNAMES('items').should.eql(['cost', 'choice_value', 'child_items', 'child_item_cost', 'grandchild_items', 'grandchild_item_cost']);
      return FIELDNAMES('items', {
        repeatables: false
      }).length.should.eql(3);
    });
  });

  describe('FIXED', function() {
    return it('returns the fixed represention of a number', function() {
      FIXED(12345678901 / 3, 3).should.eql('4,115,226,300.333');
      FIXED(12345678901 / 3, 3, true).should.eql('4115226300.333');
      FIXED(1 / 3, 3, true).should.eql('0.333');
      FIXED(1 / 3, 3).should.eql('0.333');
      FIXED(2 / 3, 3).should.eql('0.667');
      FIXED(13.371337, 3).should.eql('13.371');
      FIXED(3 * 3.2, 1).should.eql('9.6');
      FIXED(0).should.eql('0.00');
      FIXED(1, 10).should.eql('1.0000000000');
      FIXED(100000, 10).should.eql('100,000.0000000000');
      FIXED(1000000001, 10).should.eql('1,000,000,001.0000000000');
      FIXED(9999999999, 10).should.eql('9,999,999,999.0000000000');
      FIXED(9999999999.001, 3).should.eql('9,999,999,999.001');
      FIXED(19 - 19.5, 3).should.eql('-0.500');
      CONFIGURE({
        decimalSeparator: ',',
        groupingSeparator: '.'
      });
      FIXED(12345678901 / 3, 3).should.eql('4.115.226.300,333');
      FIXED(12345678901 / 3, 3, true).should.eql('4115226300,333');
      FIXED(1 / 3, 3, true).should.eql('0,333');
      FIXED(1 / 3, 3).should.eql('0,333');
      FIXED(13.371337, 3).should.eql('13,371');
      FIXED(3 * 3.2, 1).should.eql('9,6');
      FIXED(0).should.eql('0,00');
      FIXED(-0.044).should.eql('-0,04');
      FIXED(1, 10).should.eql('1,0000000000');
      FIXED(100000, 10).should.eql('100.000,0000000000');
      FIXED(1000000001, 10).should.eql('1.000.000.001,0000000000');
      CONFIGURE({
        decimalSeparator: '.',
        groupingSeparator: ',',
        groupingSize: 4
      });
      FIXED(12345678901 / 3, 3).should.eql('41,1522,6300.333');
      FIXED(12345678901 / 3, 3, true).should.eql('4115226300.333');
      CONFIGURE({
        decimalSeparator: '.',
        groupingSeparator: ',',
        groupingSize: 3
      });
      shouldHaveNoValue(FIXED([]));
      shouldHaveNoValue(FIXED({}));
      shouldHaveNoValue(FIXED(void 0));
      shouldHaveNoValue(FIXED(null));
      shouldHaveNoValue(FIXED(new Date));
      shouldHaveNoValue(FIXED(new RegExp));
      return shouldHaveNoValue(FIXED(''));
    });
  });

  describe('LOCALE', function() {
    return it('returns the current locale', function() {
      LOCALE().should.eql('en_US');
      return CONFIGURE({
        locale: 'pt_BR'
      }).locale.should.eql('pt_BR');
    });
  });

  describe('FORMAT', function() {
    return it('formats strings', function() {
      FORMAT('%s-%s-%s-%s', 1, 2, 3, 4).should.be.exactly('1-2-3-4');
      FORMAT('%s|%s|%s|%s', 1, 2, 3, 4).should.be.exactly('1|2|3|4');
      FORMAT('%s%%', 1).should.be.exactly('1%');
      FORMAT('%d + %d == %d', 2, 3, 5).should.be.exactly('2 + 3 == 5');
      FORMAT('%d + %d == %d', '2', 3, 5).should.be.exactly('2 + 3 == 5');
      FORMAT('%d', 'a').should.be.exactly('NaN');
      FORMAT('%d', 1.337).should.be.exactly('1.337');
      FORMAT('%d', null).should.be.exactly('0');
      FORMAT('%d', void 0).should.be.exactly('NaN');
      FORMAT('%s', null).should.be.exactly('null');
      FORMAT('%s', void 0).should.be.exactly('undefined');
      FORMAT('%s', true).should.be.exactly('true');
      return FORMAT('%j', {
        x: 1
      }).should.be.exactly('{"x":1}');
    });
  });

  describe('FORMATADDRESS', function() {
    return it('formats an address', function() {
      var address;
      address = {
        sub_thoroughfare: '360',
        thoroughfare: 'Central Avenue',
        suite: '200',
        locality: 'St. Petersburg',
        sub_admin_area: 'Pinellas',
        admin_area: 'FL',
        postal_code: '33701',
        country: 'US'
      };
      FORMATADDRESS(address).should.eql('360 Central Avenue #200\nSt. Petersburg FL 33701\nUS');
      FORMATADDRESS(address, {
        lineSeparator: ' '
      }).should.eql('360 Central Avenue #200 St. Petersburg FL 33701 US');
      FORMATADDRESS(address, {
        lineSeparator: ', ',
        partSeparator: ', '
      }).should.eql('360, Central Avenue, #200, St. Petersburg, FL, 33701, US');
      FORMATADDRESS({
        locality: 'St. Petersburg'
      }).should.eql('St. Petersburg');
      return FORMATADDRESS({
        locality: 'St. Petersburg',
        thoroughfare: 'Central Avenue'
      }).should.eql('Central Avenue\nSt. Petersburg');
    });
  });

  describe('FORMATNUMBER', function() {
    return it('formats a number in a given locale', function() {
      FORMATNUMBER(1 / 3).should.eql('0.333');
      FORMATNUMBER(1 / 3, 'pt-BR').should.eql('0,333');
      FORMATNUMBER(10000 / 3, 'pt-BR').should.eql('3.333,333');
      FORMATNUMBER(10000 / 3, 'fr-FR').should.eql('3 333,333');
      FORMATNUMBER(10000 / 3, 'pt-BR', {
        useGrouping: false
      }).should.eql('3333,333');
      FORMATNUMBER(10000 / 3, 'fr-FR', {
        useGrouping: false
      }).should.eql('3333,333');
      FORMATNUMBER(1 / 3, null, {
        minimumFractionDigits: 5
      }).should.eql('0.33333');
      FORMATNUMBER(1 / 3, null, {
        maximumFractionDigits: 2
      }).should.eql('0.33');
      FORMATNUMBER(1 / 3, null, {
        minimumIntegerDigits: 2
      }).should.eql('00.333');
      FORMATNUMBER(10000 / 3, 'pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).should.eql('R$3.333,33');
      FORMATNUMBER(10000 / 3, 'fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).should.eql('3 333,33 €');
      CONFIGURE({
        currencyCode: 'BRL'
      });
      FORMATNUMBER(10000 / 3, 'pt-BR', {
        style: 'currency'
      }).should.eql('R$3.333,33');
      FORMATNUMBER(10000 / 3).should.eql('3,333.333');
      CONFIGURE({
        currencyCode: 'EUR'
      });
      FORMATNUMBER(10000 / 3, 'pt-BR', {
        style: 'currency'
      }).should.eql('€3.333,33');
      FORMATNUMBER(10000 / 3, 'fr-FR', {
        style: 'currency'
      }).should.eql('3 333,33 €');
      FORMATNUMBER(10000 / 3, 'en-US', {
        style: 'currency'
      }).should.eql('€3,333.33');
      CONFIGURE({
        currencyCode: 'BRL'
      });
      FORMATNUMBER(10000 / 3, 'pt-BR', {
        style: 'currency'
      }).should.eql('R$3.333,33');
      FORMATNUMBER(10000 / 3, 'fr-FR', {
        style: 'currency'
      }).should.eql('3 333,33 R$');
      FORMATNUMBER(10000 / 3, 'en-US', {
        style: 'currency'
      }).should.eql('R$3,333.33');
      CONFIGURE({
        currencyCode: 'USD'
      });
      FORMATNUMBER(10000 / 3, 'pt-BR', {
        style: 'currency'
      }).should.eql('US$3.333,33');
      FORMATNUMBER(10000 / 3, 'fr-FR', {
        style: 'currency'
      }).should.eql('3 333,33 $US');
      return FORMATNUMBER(10000 / 3, 'en-US', {
        style: 'currency'
      }).should.eql('$3,333.33');
    });
  });

  describe('DOLLAR', function() {
    return it('returns a string with a formatted dollar amount in the current locale', function() {
      DOLLAR(10000 / 3).should.eql('$3,333.33');
      DOLLAR(10000 / 3, 0).should.eql('$3,333');
      DOLLAR(10000 / 3, 4).should.eql('$3,333.3333');
      CONFIGURE({
        currencyCode: 'EUR'
      });
      DOLLAR(10000 / 3).should.eql('€3,333.33');
      DOLLAR(10000 / 3, 0).should.eql('€3,333');
      DOLLAR(10000 / 3, 4).should.eql('€3,333.3333');
      resetConfig();
      DOLLAR(10000 / 3, 2, 'GBP').should.eql('£3,333.33');
      DOLLAR(10000 / 3, 0, 'GBP').should.eql('£3,333');
      return DOLLAR(10000 / 3, 4, 'GBP').should.eql('£3,333.3333');
    });
  });

  describe('VERSIONINFO', function() {
    return it('returns version info as a string', function() {
      return VERSIONINFO().should.eql('Apple iPhone6,2, iOS 8.1, Fulcrum 2.7.0 2162');
    });
  });

  describe('LATITUDE', function() {
    return it('returns the latitude of the current feature', function() {
      CONFIGURE(variables);
      LATITUDE().should.eql(27.770756908186286);
      CONFIGURE({
        featureGeometry: null
      });
      return LATITUDE().should.be.NaN();
    });
  });

  describe('LONGITUDE', function() {
    return it('returns the longitude of the current feature', function() {
      LONGITUDE().should.eql(-82.63814896345139);
      CONFIGURE({
        featureGeometry: null
      });
      return LONGITUDE().should.be.NaN();
    });
  });

  describe('GEOMETRY', function() {
    return it('returns the geometry of the current feature', function() {
      var polygon;
      polygon = {
        type: "Polygon",
        coordinates: [[[-82.47576689405734, 27.977757676187323], [-82.47699950483403, 27.974250052144896], [-82.47508211029273, 27.973524322585376], [-82.47357558600966, 27.97509673046042], [-82.47576689405734, 27.977757676187323]]]
      };
      CONFIGURE({
        featureGeometry: polygon
      });
      return GEOMETRY().should.eql(polygon);
    });
  });

  point = {
    type: 'Point',
    coordinates: [-82.47576689405734, 27.977757676187323]
  };

  lineString = {
    type: "LineString",
    coordinates: [[-82.47576689405734, 27.977757676187323], [-82.47699950483403, 27.974250052144896], [-82.47508211029273, 27.973524322585376], [-82.47357558600966, 27.97509673046042], [-82.47576689405734, 27.977757676187323]]
  };

  polygon = {
    type: "Polygon",
    coordinates: [[[-82.47576689405734, 27.977757676187323], [-82.47699950483403, 27.974250052144896], [-82.47508211029273, 27.973524322585376], [-82.47357558600966, 27.97509673046042], [-82.47576689405734, 27.977757676187323]]]
  };

  describe('GEOMETRYALONG', function() {
    return it('returns a point along a line', function() {
      return GEOMETRYALONG(lineString, 5).should.eql({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [-82.47576689405734, 27.977757676187323]
        }
      });
    });
  });

  describe('GEOMETRYAREA', function() {
    return it('returns the area of a polygon', function() {
      GEOMETRYAREA(polygon).should.eql(82487.30619407611);
      GEOMETRYAREA(lineString).should.eql(0);
      GEOMETRYAREA(point).should.eql(0);
      (function() {
        return GEOMETRYAREA(null);
      }).should["throw"]();
      (function() {
        return GEOMETRYAREA(void 0);
      }).should["throw"]();
      return (function() {
        return GEOMETRYAREA({});
      }).should["throw"]('Unknown Geometry Type');
    });
  });

  describe('GEOMETRYBEARING', function() {
    return it('returns the bearing between 2 points', function() {
      var point1, point2;
      point1 = {
        type: 'Point',
        coordinates: [-82.47576, 27.97775]
      };
      point2 = {
        type: 'Point',
        coordinates: [-81.47176, 29.07775]
      };
      GEOMETRYBEARING(point1, point2).should.eql(38.48783290426236);
      return GEOMETRYBEARING(point1, point1).should.eql(0);
    });
  });

  describe('GEOMETRYBUFFER', function() {
    return it('buffers a geometry', function() {
      GEOMETRYBUFFER(polygon, 10, {
        units: 'meters'
      }).should.eql({
        type: 'Feature',
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [[[-82.47568453827446, 27.977810572293752], [-82.4756981604322, 27.97782403277794], [-82.47571455231702, 27.97783481932522], [-82.47573305339334, 27.977842497275038], [-82.47575291813192, 27.97784675723248], [-82.47577334605226, 27.977847427535913], [-82.47579351397937, 27.977844481174397], [-82.47581260921521, 27.977838036876193], [-82.47582986228778, 27.977828354324316], [-82.47584457795843, 27.977815823692172], [-82.47585616323757, 27.97780094992082], [-82.47586415128015, 27.97778433237148], [-82.47709675919884, 27.974276707462298], [-82.47710091009739, 27.97425825762527], [-82.47710062457327, 27.974239448804777], [-82.47709591512027, 27.974221103875827], [-82.47708698777632, 27.974204025418025], [-82.47707423310902, 27.974188960603243], [-82.47705820912836, 27.97417656850749], [-82.47703961687392, 27.97416739127676], [-82.47512222353201, 27.97344166227335], [-82.47510160745033, 27.973436054413277], [-82.47508011639013, 27.973434407791043], [-82.47505871481077, 27.9734367963025], [-82.47503836315595, 27.973443112757867], [-82.47501997475199, 27.97345307369206], [-82.47500437482053, 27.97346623208576], [-82.47349785021564, 27.97503863911403], [-82.473486819009, 27.975052661908563], [-82.4734789876919, 27.975068273296838], [-82.47347463857065, 27.975084910516475], [-82.47347392842492, 27.97510197382545], [-82.4734768828559, 27.9751188481217], [-82.47348339536323, 27.97513492511645], [-82.47349323118384, 27.97514962526199], [-82.47568453827446, 27.977810572293752]]]
        }
      });
      return GEOMETRYBUFFER(lineString, 20, {
        units: 'meters',
        steps: 2
      }).should.eql({
        type: 'Feature',
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [[[-82.47719401361172, 27.974303362711307], [-82.477184411975, 27.974174663678557], [-82.47707972885233, 27.974084730396996], [-82.47516233670981, 27.97335900194969], [-82.47503531936675, 27.973349270015664], [-82.47492663943204, 27.973408141542436], [-82.47342011450534, 27.974980547723934], [-82.47337206183079, 27.975090123970215], [-82.47341087627726, 27.97520252001451], [-82.4756021824108, 27.977863468351135], [-82.47565705526041, 27.977893132191117], [-82.47570652634803, 27.97792945763053], [-82.47572193443348, 27.97792820532338], [-82.47573513143665, 27.977935339505162], [-82.47579768376471, 27.97792204869732], [-82.47586175029824, 27.977916841573002], [-82.47587164274118, 27.97790633422077], [-82.4758866866489, 27.977903137752328], [-82.47592027600966, 27.977854677892623], [-82.47596140855103, 27.97781098848725], [-82.47719401361172, 27.974303362711307]], [[-82.47569274851492, 27.977361844134354], [-82.47383432758582, 27.975105128899653], [-82.4751403046491, 27.973742036453817], [-82.47675060315287, 27.974351531260133], [-82.47569274851492, 27.977361844134354]]]
        }
      });
    });
  });

  describe('GEOMETRYCENTROID', function() {
    return it('returns the centroid of the geometry', function() {
      GEOMETRYCENTROID(polygon).should.eql({
        properties: {},
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-82.47535602379844, 27.975157195344504]
        }
      });
      return GEOMETRYCENTROID(lineString).should.eql({
        properties: {},
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-82.47543819785022, 27.97567729151307]
        }
      });
    });
  });

  describe('GEOMETRYCONVEX', function() {
    return it('returns a convex hull polygon for a given set of points', function() {
      var points;
      points = GEOMETRYFEATURECOLLECTION(polygon.coordinates[0].map(GEOMETRYPOINT));
      return GEOMETRYCONVEX(points).should.eql({
        type: 'Feature',
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [[[-82.47508211029273, 27.973524322585376], [-82.47699950483403, 27.974250052144896], [-82.47576689405734, 27.977757676187323], [-82.47357558600966, 27.97509673046042], [-82.47508211029273, 27.973524322585376]]]
        }
      });
    });
  });

  describe('GEOMETRYDISTANCE', function() {
    return it('calculates the distance between 2 points', function() {
      var point1, point2;
      point1 = {
        type: 'Point',
        coordinates: [-82.47576, 27.97775]
      };
      point2 = {
        type: 'Point',
        coordinates: [-81.47176, 29.07775]
      };
      GEOMETRYDISTANCE(point1, point2).should.eql(156.78313989454617);
      GEOMETRYDISTANCE(point1, point2, {
        units: 'meters'
      }).should.eql(156783.13989454618);
      return GEOMETRYDISTANCE(point1, point2, {
        units: 'miles'
      }).should.eql(97.42052655898688);
    });
  });

  describe('GEOMETRYFEATURE', function() {
    return it('creates a GeoJSON feature from a GeoJSON geometry', function() {
      return GEOMETRYFEATURE(point, {
        name: 'hello'
      }).should.eql({
        type: 'Feature',
        properties: {
          name: 'hello'
        },
        geometry: {
          type: 'Point',
          coordinates: [-82.47576689405734, 27.977757676187323]
        }
      });
    });
  });

  describe('GEOMETRYFEATURECOLLECTION', function() {
    return it('creates a GeoJSON feature collection from GeoJSON features', function() {
      return GEOMETRYFEATURECOLLECTION([
        GEOMETRYFEATURE(point, {
          name: 'hello point'
        }), GEOMETRYFEATURE(polygon, {
          name: 'hello polygon'
        })
      ]).should.eql({
        type: "FeatureCollection",
        features: [
          {
            type: 'Feature',
            properties: {
              name: 'hello point'
            },
            geometry: {
              type: 'Point',
              coordinates: [-82.47576689405734, 27.977757676187323]
            }
          }, {
            type: 'Feature',
            properties: {
              name: 'hello polygon'
            },
            geometry: {
              type: 'Polygon',
              coordinates: [[[-82.47576689405734, 27.977757676187323], [-82.47699950483403, 27.974250052144896], [-82.47508211029273, 27.973524322585376], [-82.47357558600966, 27.97509673046042], [-82.47576689405734, 27.977757676187323]]]
            }
          }
        ]
      });
    });
  });

  describe('GEOMETRYLENGTH', function() {
    return it('returns the length of a geometry', function() {
      GEOMETRYLENGTH(polygon).should.eql(1.2081368829498567);
      GEOMETRYLENGTH(lineString).should.eql(1.2081368829498567);
      return GEOMETRYLENGTH(point).should.eql(0);
    });
  });

  describe('GEOMETRYLINESTRING', function() {
    return it('creates a GeoJSON LineString Feature from an array of coordinates', function() {
      return GEOMETRYLINESTRING(lineString.coordinates, {
        name: 'line'
      }).should.eql({
        type: 'Feature',
        properties: {
          name: 'line'
        },
        geometry: lineString
      });
    });
  });

  describe('GEOMETRYNEARESTPOINT', function() {
    return it('returns the point closest to the given point', function() {
      var points, targetPoint;
      points = GEOMETRYFEATURECOLLECTION(polygon.coordinates[0].map(GEOMETRYPOINT));
      targetPoint = {
        type: 'Point',
        coordinates: [-81.47176, 29.07775]
      };
      return GEOMETRYNEARESTPOINT(targetPoint, points).should.eql({
        type: 'Feature',
        properties: {
          distanceToPoint: 156.78289311309206,
          featureIndex: 0
        },
        geometry: {
          coordinates: [-82.47576689405734, 27.977757676187323],
          type: 'Point'
        }
      });
    });
  });

  describe('GEOMETRYNEARESTPOINTONLINE', function() {
    return it('returns the nearest point on a line', function() {
      point = {
        type: 'Point',
        coordinates: [-82.47400033160908, 27.9766961224896]
      };
      return GEOMETRYNEARESTPOINTONLINE(lineString, point).should.eql({
        type: 'Feature',
        properties: {
          dist: 0.07087037635489613,
          index: 3,
          location: 1.0106382899750093
        },
        geometry: {
          coordinates: [-82.47458397909747, 27.97632124076188],
          type: 'Point'
        }
      });
    });
  });

  describe('GEOMETRYPOINT', function() {
    return it('creates a GeoJSON Point feature from an array of coordinates', function() {
      return GEOMETRYPOINT(point.coordinates, {
        name: 'test point'
      }).should.eql({
        type: 'Feature',
        properties: {
          name: 'test point'
        },
        geometry: point
      });
    });
  });

  describe('GEOMETRYPOLYGON', function() {
    return it('creates a GeoJSON Polygon feature from an array of coordinates', function() {
      return GEOMETRYPOLYGON(polygon.coordinates, {
        name: 'test polygon'
      }).should.eql({
        type: 'Feature',
        properties: {
          name: 'test polygon'
        },
        geometry: polygon
      });
    });
  });

  describe('GEOMETRYTAG', function() {
    return it('takes a set of points and a set of polygons and/or multipolygons and performs a spatial join', function() {
      var points, polygons;
      polygons = {
        type: "FeatureCollection",
        features: [
          {
            type: 'Feature',
            properties: {
              name: "Area 1"
            },
            geometry: {
              coordinates: [[[-82.64183622729392, 27.80931744582226], [-82.64326557402613, 27.80622328073855], [-82.6428142013739, 27.80436008506105], [-82.6407077956637, 27.80459298626822], [-82.64183622729392, 27.80931744582226]]],
              type: "Polygon"
            }
          }, {
            type: 'Feature',
            properties: {
              name: "Area 2"
            },
            geometry: {
              coordinates: [[[-82.64134724025435, 27.80928417569892], [-82.64006835107313, 27.804792615477268], [-82.63788671658746, 27.80532495824022], [-82.63878946189192, 27.807554115231397], [-82.64134724025435, 27.80928417569892]]],
              type: "Polygon"
            }
          }
        ]
      };
      points = {
        type: "FeatureCollection",
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              coordinates: [-82.63973280341598, 27.807313514489366],
              type: 'Point'
            }
          }, {
            type: 'Feature',
            properties: {},
            geometry: {
              coordinates: [-82.63977041780413, 27.805117623971498],
              type: 'Point'
            }
          }, {
            type: 'Feature',
            properties: {},
            geometry: {
              coordinates: [-82.64206489545266, 27.80588286358477],
              type: 'Point'
            }
          }, {
            type: 'Feature',
            properties: {},
            geometry: {
              coordinates: [-82.63965757464048, 27.80372021598768],
              type: 'Point'
            }
          }
        ]
      };
      return GEOMETRYTAG(points, polygons, 'name', 'name').should.eql({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              name: 'Area 2'
            },
            geometry: {
              coordinates: [-82.63973280341598, 27.807313514489366],
              type: 'Point'
            }
          }, {
            type: 'Feature',
            properties: {
              name: 'Area 2'
            },
            geometry: {
              coordinates: [-82.63977041780413, 27.805117623971498],
              type: 'Point'
            }
          }, {
            type: 'Feature',
            properties: {
              name: 'Area 1'
            },
            geometry: {
              coordinates: [-82.64206489545266, 27.80588286358477],
              type: 'Point'
            }
          }, {
            properties: {},
            type: 'Feature',
            geometry: {
              coordinates: [-82.63965757464048, 27.80372021598768],
              type: 'Point'
            }
          }
        ]
      });
    });
  });

  describe('GEOMETRYINTERSECTS', function() {
    return it('checks whether a geometry intersects another geometry', function() {
      var inside, outside;
      polygon = {
        type: "Polygon",
        coordinates: [[[-82.64183622729392, 27.80931744582226], [-82.64326557402613, 27.80622328073855], [-82.6428142013739, 27.80436008506105], [-82.6407077956637, 27.80459298626822], [-82.64183622729392, 27.80931744582226]]]
      };
      inside = {
        type: 'Point',
        coordinates: [-82.64206489, 27.805882]
      };
      outside = {
        type: 'Point',
        coordinates: [-85.64206489, 29.805882]
      };
      GEOMETRYINTERSECTS(inside, polygon).should.eql(true);
      return GEOMETRYINTERSECTS(outside, polygon).should.eql(false);
    });
  });

  describe('GEOMETRYWITHIN', function() {
    return it('checks whether a geometry is within another geometry', function() {
      var inside, outside;
      polygon = {
        type: "Polygon",
        coordinates: [[[-82.64183622729392, 27.80931744582226], [-82.64326557402613, 27.80622328073855], [-82.6428142013739, 27.80436008506105], [-82.6407077956637, 27.80459298626822], [-82.64183622729392, 27.80931744582226]]]
      };
      inside = {
        type: 'Point',
        coordinates: [-82.64206489, 27.805882]
      };
      outside = {
        type: 'Point',
        coordinates: [-85.64206489, 29.805882]
      };
      GEOMETRYWITHIN(inside, polygon).should.eql(true);
      return GEOMETRYWITHIN(outside, polygon).should.eql(false);
    });
  });

  describe('LPAD', function() {
    return it('pads a string on the left', function() {
      LPAD('test', 5).should.be.exactly(' test');
      LPAD('t', 5).should.be.exactly('    t');
      LPAD('test', 10).should.be.exactly('      test');
      LPAD('1', 2, '0').should.be.exactly('01');
      return LPAD('1', 4, '0').should.be.exactly('0001');
    });
  });

  describe('STATUS', function() {
    return it('returns the status of the current record', function() {
      STATUS().should.eql('approved');
      CONFIGURE({
        recordStatus: null
      });
      return shouldHaveNoValue(STATUS());
    });
  });

  describe('STATUSLABEL', function() {
    return it('returns the status label of the current record', function() {
      STATUSLABEL().should.eql('Approved');
      CONFIGURE({
        recordStatus: null
      });
      return shouldHaveNoValue(STATUSLABEL());
    });
  });

  describe('REPEATABLEVALUES', function() {
    it('returns a specific field out of a collection of repeatable items', function() {
      var $repeatable_field, costs;
      $repeatable_field = variables.values.form_values['1337'];
      costs = REPEATABLEVALUES($repeatable_field, 'cost');
      return costs.should.eql([1, 2, 3]);
    });
    it('looks for 2 levels of data with 1 orphan', function() {
      var $repeatable_field, levels;
      $repeatable_field = variables.values.form_values['1337'];
      levels = REPEATABLEVALUES($repeatable_field, ['child_items', 'child_item_cost']);
      return levels.should.eql([4, 5, 10, null]);
    });
    it('looks for 3 levels of data with 1 orphan', function() {
      var $repeatable_field, levels;
      $repeatable_field = variables.values.form_values['1337'];
      levels = REPEATABLEVALUES($repeatable_field, ['child_items', 'grandchild_items', 'grandchild_item_cost']);
      return levels.should.eql([null, 21, null, null]);
    });
    it('returns grandchild data out of repeatables', function() {
      var $repeatable_field, child_items, child_items_all;
      $repeatable_field = variables.values.form_values['1337'];
      child_items = REPEATABLEVALUES($repeatable_field, 'child_items').map((function(_this) {
        return function(item) {
          return REPEATABLEVALUES(item, 'child_item_cost');
        };
      })(this));
      child_items.should.eql([[4, 5], [10], null]);
      child_items_all = REPEATABLEVALUES($repeatable_field, ['child_items', 'child_item_cost']);
      return child_items_all.should.eql([4, 5, 10, null]);
    });
    it('returns a specific field out of a blank collection of repeatable items', function() {
      var $repeatable_field, costs;
      $repeatable_field = [];
      costs = REPEATABLEVALUES($repeatable_field, 'cost');
      return costs.should.eql([]);
    });
    return it('returns no value if the data name of the field does not exist', function() {
      var $repeatable_field, costs;
      $repeatable_field = variables.values.form_values['1337'];
      costs = REPEATABLEVALUES($repeatable_field, 'does_not_exist');
      return shouldHaveNoValue(costs);
    });
  });

  describe('REPEATABLESUM', function() {
    it('returns the sum of a specific numeric field within a repeatable field', function() {
      var $repeatable_field, totalCost;
      $repeatable_field = variables.values.form_values['1337'];
      totalCost = REPEATABLESUM($repeatable_field, 'cost');
      return totalCost.should.eql(6);
    });
    it('returns the sum of grandchild records', function() {
      var $repeatable_field, totalCost;
      $repeatable_field = variables.values.form_values['1337'];
      totalCost = REPEATABLESUM($repeatable_field, ['child_items', 'child_item_cost']);
      return totalCost.should.eql(19);
    });
    it('returns the sum of a specific numeric field within a blank collection of repeatable items', function() {
      var $repeatable_field, totalCost;
      $repeatable_field = [];
      totalCost = REPEATABLESUM($repeatable_field, 'cost');
      return totalCost.should.be.NaN();
    });
    it('returns the sum of a specific numeric field when some of the items have no value', function() {
      var $repeatable_field, totalCost;
      $repeatable_field = [
        {
          id: '1',
          form_values: {
            '1338': 1
          }
        }, {
          id: '2',
          form_values: {}
        }, {
          id: '3',
          form_values: {
            '1338': 4
          }
        }, {
          id: '4',
          form_values: {
            '1338': ''
          }
        }
      ];
      totalCost = REPEATABLESUM($repeatable_field, 'cost');
      return totalCost.should.be.exactly(5);
    });
    return it('returns no value if the data name of the field does not exist', function() {
      var $repeatable_field, totalCost;
      $repeatable_field = variables.values.form_values['1337'];
      totalCost = REPEATABLESUM($repeatable_field, 'does_not_exist');
      return totalCost.should.be.NaN();
    });
  });

  describe('DATANAMES', function() {
    return it('returns the data names of the form fields', function() {
      var names;
      names = DATANAMES();
      names.should.eql(['name', 'items', 'cost', 'choice_value', 'child_items', 'child_item_cost', 'grandchild_items', 'grandchild_item_cost', 'choice_field', 'checklist', 'sketch_field']);
      names = DATANAMES('Repeatable');
      return names.should.eql(['items', 'child_items', 'grandchild_items']);
    });
  });

  describe('DATE', function() {
    return it('returns a date given a year, month, and day', function() {
      var date;
      date = DATE(2015, 1, 14);
      date.getFullYear().should.be.exactly(2015);
      date.getMonth().should.be.exactly(0);
      date.getDate().should.be.exactly(14);
      shouldHaveNoValue(DATE('a', 'b', 'c'));
      return shouldHaveNoValue(DATE(new Date));
    });
  });

  describe('DATE', function() {
    return it('returns a date given a date string', function() {
      var date, dateObject;
      dateObject = DATE(2015, 1, 14);
      date = DATEVALUE(dateObject.toString());
      date.getFullYear().should.be.exactly(2015);
      date.getMonth().should.be.exactly(0);
      date.getDate().should.be.exactly(14);
      date = DATEVALUE(dateObject);
      date.getFullYear().should.be.exactly(2015);
      date.getMonth().should.be.exactly(0);
      date.getDate().should.be.exactly(14);
      return shouldHaveNoValue(DATEVALUE('a', 'b', 'c'));
    });
  });

  describe('DATEVALUE', function() {
    return it('returns a date value given a date and optional time string', function() {
      var d, date, expected;
      date = DATEVALUE('2018-02-07');
      date.getFullYear().should.be.exactly(2018);
      date.getMonth().should.be.exactly(1);
      date.getDate().should.be.exactly(7);
      date = DATEVALUE('2018-02-08T01:01:01Z');
      date.getFullYear().should.be.exactly(2018);
      date.getMonth().should.be.exactly(1);
      date.getDate().should.be.exactly(7);
      expected = new Date('2018/02/07 01:01:00');
      date = DATEVALUE('2018-02-07', '01:01');
      date.getFullYear().should.be.exactly(expected.getFullYear());
      date.getMonth().should.be.exactly(expected.getMonth());
      date.getDate().should.be.exactly(expected.getDate());
      date.toISOString().should.be.exactly(expected.toISOString());
      d = new Date('2018-02-07T05:00:00.000Z');
      expected = new Date(d.getFullYear() + '/0' + (d.getMonth() + 1) + '/0' + d.getDate() + ' 01:01:00');
      date = DATEVALUE(new Date('2018-02-07T05:00:00.000Z'), '01:01');
      date.getFullYear().should.be.exactly(expected.getFullYear());
      date.getMonth().should.be.exactly(expected.getMonth());
      date.getDate().should.be.exactly(expected.getDate());
      return date.toISOString().should.be.exactly(expected.toISOString());
    });
  });

  describe('DAY', function() {
    return it('returns a day given a date', function() {
      DAY('2015/12/16').should.be.exactly(16);
      DAY('2015-12-16').should.be.exactly(16);
      DAY('2015.12.16').should.be.exactly(16);
      DAY('2015 12 16').should.be.exactly(16);
      DAY('12/16/2015').should.be.exactly(16);
      DAY('12-16-2015').should.be.exactly(16);
      DAY('12.16.2015').should.be.exactly(16);
      DAY('12 16 2015').should.be.exactly(16);
      DAY('5/1/2015').should.be.exactly(1);
      DAY(new Date('2015/12/16 00:00:00')).should.be.exactly(16);
      DAY(new Date('2015-12-16 00:00:00')).should.be.exactly(16);
      DAY(new Date('2015 12 16 00:00:00')).should.be.exactly(16);
      DAY(new Date('2015/5/1 00:00:00')).should.be.exactly(1);
      return shouldHaveNoValue(DAY('not a date'));
    });
  });

  describe('EMAIL', function() {
    return it('returns the email', function() {
      return EMAIL().should.eql('test@example.com');
    });
  });

  describe('MONTH', function() {
    return it('returns a month given a date', function() {
      MONTH('2015/12/16').should.be.exactly(12);
      MONTH('2015-12-16').should.be.exactly(12);
      MONTH('2015.12.16').should.be.exactly(12);
      MONTH('2015 12 16').should.be.exactly(12);
      MONTH('12/16/2015').should.be.exactly(12);
      MONTH('12.16.2015').should.be.exactly(12);
      MONTH('12-16-2015').should.be.exactly(12);
      MONTH('12 16 2015').should.be.exactly(12);
      MONTH('5/1/2015').should.be.exactly(5);
      MONTH(new Date('2015/12/16 00:00:00')).should.be.exactly(12);
      MONTH(new Date('2015-12-16 00:00:00')).should.be.exactly(12);
      MONTH(new Date('2015.12.16 00:00:00')).should.be.exactly(12);
      MONTH(new Date('2015 12 16 00:00:00')).should.be.exactly(12);
      MONTH(new Date('2015/5/1 00:00:00')).should.be.exactly(5);
      return shouldHaveNoValue(MONTH('not a date'));
    });
  });

  describe('RECORDID', function() {
    return it('returns the record ID', function() {
      return RECORDID().should.eql('96eb35f5-13d8-4666-b188-8108019d0984');
    });
  });

  describe('REPEATABLEID', function() {
    return it('returns the repeatable item ID', function() {
      return REPEATABLEID().should.eql('859fdb06-4e7d-4bed-b1d2-af168db71522');
    });
  });

  describe('REPEATABLENUMBER', function() {
    return it('returns the repeatable item number', function() {
      return REPEATABLENUMBER().should.eql(4);
    });
  });

  describe('ROLE', function() {
    return it('returns the role name', function() {
      return ROLE().should.eql('Owner');
    });
  });

  describe('RPAD', function() {
    return it('pads a string on the right', function() {
      RPAD('test', 5).should.be.exactly('test ');
      RPAD('t', 5).should.be.exactly('t    ');
      RPAD('test', 10).should.be.exactly('test      ');
      RPAD('1', 2, '0').should.be.exactly('10');
      return RPAD('1', 4, '0').should.be.exactly('1000');
    });
  });

  describe('SORT', function() {
    return it('returns the sorted values from the parameters', function() {
      SORT(1, 2, 3).should.be.eql([1, 2, 3]);
      SORT(3, 2, 1, 3, 3, 3).should.be.eql([1, 2, 3, 3, 3, 3]);
      SORT(1, 2, 'a').should.be.eql([1, 2, 'a']);
      SORT(1, 2, 'a', 'a').should.be.eql([1, 2, 'a', 'a']);
      SORT('a', 'c', 'c', 'b', 'a').should.be.eql(['a', 'a', 'b', 'c', 'c']);
      SORT(1).should.be.eql([1]);
      SORT(1, 1.5, 3.75).should.be.eql([1, 1.5, 3.75]);
      SORT(1, [1.5, 3.75]).should.be.eql([1, 1.5, 3.75]);
      SORT({
        test: 2
      }, {
        test: 1
      }, {
        test: 1
      }, function(a, b) {
        return a.test;
      }).should.be.eql([
        {
          test: 1
        }, {
          test: 1
        }, {
          test: 2
        }
      ]);
      return SORT([
        {
          test: 2
        }, {
          test: 1
        }, {
          test: 1
        }
      ], function(a, b) {
        return a.test;
      }).should.be.eql([
        {
          test: 1
        }, {
          test: 1
        }, {
          test: 2
        }
      ]);
    });
  });

  describe('STRING', function() {
    return it('turns anything into a string', function() {
      STRING(1, 2, 3).should.be.eql('1, 2, 3');
      STRING([1, 2, 3]).should.be.eql('1, 2, 3');
      STRING([1, 2, 3], [4, 5, 6]).should.be.eql('1, 2, 3, 4, 5, 6');
      STRING({
        choice_values: ['a', 'b', 'c']
      }, {
        choice_values: ['d', 'e', 'f']
      }).should.be.eql('a, b, c, d, e, f');
      return STRING(new Date('2018-02-07T10:00:01Z')).should.be.eql((new Date('2018-02-07T10:00:01Z')).toLocaleString());
    });
  });

  describe('TIMEDIFF', function() {
    return it('returns the number of minutes between 2 times', function() {
      TIMEDIFF('00:00', '00:01').should.be.exactly(1 / 60);
      TIMEDIFF('14:00', '18:00').should.be.exactly(4);
      TIMEDIFF('02:00', '01:00').should.be.exactly(23);
      TIMEDIFF('02:00', '02:00').should.be.exactly(24);
      TIMEDIFF('22:00', '06:00').should.be.exactly(8);
      TIMEDIFF('12:00', '19:00').should.be.exactly(7);
      TIMEDIFF('23:59', '00:00').should.be.exactly(1 / 60);
      TIMEDIFF('23:59', '00:01').should.be.exactly(2 / 60);
      TIMEDIFF('00:00', '23:59').should.be.exactly(1439 / 60);
      TIMEDIFF('00:00', '00:01', 'minutes').should.be.exactly(1);
      TIMEDIFF('14:00', '18:00', 'minutes').should.be.exactly(4 * 60);
      TIMEDIFF('02:00', '01:00', 'minutes').should.be.exactly(23 * 60);
      shouldHaveNoValue(TIMEDIFF(1, 2));
      shouldHaveNoValue(TIMEDIFF('0000', '0001'));
      shouldHaveNoValue(TIMEDIFF('2:00', '6:00'));
      shouldHaveNoValue(TIMEDIFF(new Date, null));
      return shouldHaveNoValue(TIMEDIFF('2:00', void 0));
    });
  });

  describe('TIMEADD', function() {
    return it('adds a given amount of time to a time', function() {
      TIMEADD('00:00', 1).should.be.exactly('01:00');
      TIMEADD('00:00', 23).should.be.exactly('23:00');
      TIMEADD('00:00', -1).should.be.exactly('23:00');
      TIMEADD('00:00', -48).should.be.exactly('00:00');
      TIMEADD('00:00', 48).should.be.exactly('00:00');
      TIMEADD('00:00', 24).should.be.exactly('00:00');
      TIMEADD('16:00', 4).should.be.exactly('20:00');
      TIMEADD('16:00', 1.5).should.be.exactly('17:30');
      TIMEADD('16:00', -1.5).should.be.exactly('14:30');
      TIMEADD('16:00', 30, 'minutes').should.be.exactly('16:30');
      TIMEADD('16:00', 100, 'minutes').should.be.exactly('17:40');
      TIMEADD('16:00', -30, 'minutes').should.be.exactly('15:30');
      return TIMEADD('16:00', -100, 'minutes').should.be.exactly('14:20');
    });
  });

  describe('UNIQUE', function() {
    return it('returns the unique values of the parameters', function() {
      UNIQUE(1, 2, 3).should.be.eql([1, 2, 3]);
      UNIQUE(1, 2, 3, 3, 3).should.be.eql([1, 2, 3]);
      UNIQUE(1, 2, 'a').should.be.eql([1, 2, 'a']);
      UNIQUE(1, 2, 'a', 'a').should.be.eql([1, 2, 'a']);
      UNIQUE('c', 'c', 'b', 'a').should.be.eql(['c', 'b', 'a']);
      UNIQUE(1).should.be.eql([1]);
      UNIQUE(1, 1.5, 3.75).should.be.eql([1, 1.5, 3.75]);
      UNIQUE(1, [1.5, 3.75]).should.be.eql([1, 1.5, 3.75]);
      UNIQUE({
        test: 1
      }, {
        test: 1
      }, {
        test: 2
      }, function(a) {
        return a.test;
      }).should.be.eql([
        {
          test: 1
        }, {
          test: 2
        }
      ]);
      return UNIQUE([
        {
          test: 1
        }, {
          test: 1
        }, {
          test: 2
        }
      ], function(a) {
        return a.test;
      }).should.be.eql([
        {
          test: 1
        }, {
          test: 2
        }
      ]);
    });
  });

  describe('USERFULLNAME', function() {
    return it('returns the user full name', function() {
      return USERFULLNAME().should.eql('John Smith');
    });
  });

  describe('VALUE', function() {
    return it('returns a data value by a string', function() {
      VALUE('name').should.be.exactly('Test Record');
      shouldHaveNoValue(VALUE(null));
      return shouldHaveNoValue(VALUE('invalid_field'));
    });
  });

  describe('SETVALUE', function() {
    it('wraps values in quotes', function() {
      var singleField;
      SETVALUE('name', 'Fred');
      runtime.results[0].value.should.eql('"Fred"');
      singleField = {
        metadata: {
          id: 'someid'
        },
        elements: [],
        values: {}
      };
      SETVALUE('checklist', [singleField]);
      return runtime.results[1].value.should.eql(JSON.stringify([singleField]));
    });
    it('returns an empty array for invalid dynamic fields', function() {
      SETVALUE('checklist', 'strings do not work');
      SETVALUE('checklist', [
        {
          metadata: 'should be object',
          elements: [],
          values: {}
        }, {
          metadata: {
            id: {
              shouldabeen: 'a string'
            }
          },
          elements: [],
          values: {}
        }, {
          metadata: {
            id: 'elements should be an array'
          },
          elements: {},
          values: {}
        }, {
          metadata: {
            id: 'values should be an object'
          },
          elements: [],
          values: []
        }, {
          metadata: {
            id: 'someid'
          },
          elements: 'not an array',
          values: {}
        }, {
          metadata: {
            id: 'someid'
          },
          elements: [],
          values: 'not an object'
        }
      ]);
      runtime.results.length.should.eql(2);
      return _.each(runtime.results, function(res) {
        return res.value.should.eql('[]');
      });
    });
    it('sets sketch field values with valid UUIDs', function() {
      var expectedValue, validUUID1, validUUID2;
      validUUID1 = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
      validUUID2 = 'f1e2d3c4-b5a6-9870-dcba-fe0987654321';
      SETVALUE('sketch_field', [validUUID1, validUUID2]);
      runtime.results[0].key.should.eql('sk01');
      runtime.results[0].type.should.eql('set-value');
      expectedValue = JSON.stringify([
        {
          sketch_id: validUUID1
        }, {
          sketch_id: validUUID2
        }
      ]);
      return runtime.results[0].value.should.eql(expectedValue);
    });
    it('filters out invalid UUIDs for sketch field', function() {
      var expectedValue, invalidUUID1, invalidUUID2, validUUID;
      validUUID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
      invalidUUID1 = 'not-a-uuid';
      invalidUUID2 = 'a1b2c3d4-e5f6-7890-abcd';
      SETVALUE('sketch_field', [validUUID, invalidUUID1, invalidUUID2]);
      runtime.results[0].key.should.eql('sk01');
      runtime.results[0].type.should.eql('set-value');
      expectedValue = JSON.stringify([
        {
          sketch_id: validUUID
        }
      ]);
      return runtime.results[0].value.should.eql(expectedValue);
    });
    return it('returns null for non-array values in sketch field', function() {
      SETVALUE('sketch_field', 'not-an-array');
      runtime.results[0].key.should.eql('sk01');
      runtime.results[0].type.should.eql('set-value');
      return runtime.results[0].value.should.eql('null');
    });
  });

  describe('SETGEOMETRY', function() {
    it('sets the geometry using a point', function() {
      SETGEOMETRY({
        type: 'Point',
        coordinates: [1, 2]
      });
      runtime.results[0].key.should.eql('@geometry');
      runtime.results[0].type.should.eql('set-value');
      return runtime.results[0].value.should.eql(JSON.stringify({
        "type": 'Point',
        "coordinates": [1, 2]
      }));
    });
    it('sets the geometry using a polygon', function() {
      polygon = {
        type: "Polygon",
        coordinates: [[[-82.47576689405734, 27.977757676187323], [-82.47699950483403, 27.974250052144896], [-82.47508211029273, 27.973524322585376], [-82.47357558600966, 27.97509673046042], [-82.47576689405734, 27.977757676187323]]]
      };
      SETGEOMETRY(polygon);
      runtime.results[0].key.should.eql('@geometry');
      runtime.results[0].type.should.eql('set-value');
      return runtime.results[0].value.should.eql(JSON.stringify(polygon));
    });
    it('sets the geometry to null', function() {
      SETGEOMETRY(null);
      runtime.results[0].key.should.eql('@geometry');
      runtime.results[0].type.should.eql('set-value');
      return runtime.results[0].value.should.eql(JSON.stringify(null));
    });
    return it('fails when using an invalid type', function() {
      return (function() {
        return SETGEOMETRY({
          type: 'Circle',
          coordinates: [1, 2, 3]
        });
      }).should["throw"]();
    });
  });

  describe('YEAR', function() {
    return it('returns a year given a date', function() {
      YEAR('2015/01/01').should.be.exactly(2015);
      YEAR('2015-01-01').should.be.exactly(2015);
      YEAR('2015 12 16').should.be.exactly(2015);
      YEAR('01/01/2015').should.be.exactly(2015);
      YEAR('01-01-2015').should.be.exactly(2015);
      YEAR('01 01 2015').should.be.exactly(2015);
      YEAR('1/1/2015').should.be.exactly(2015);
      YEAR(new Date('2015/01/01 00:00:00')).should.be.exactly(2015);
      YEAR(new Date('2015-01-01 00:00:00')).should.be.exactly(2015);
      YEAR(new Date('2015.01.01 00:00:00')).should.be.exactly(2015);
      YEAR(new Date('2015 01 01 00:00:00')).should.be.exactly(2015);
      return shouldHaveNoValue(YEAR('not a date'));
    });
  });

  describe('ISLANDSCAPE', function() {
    return it('is checks whether the media is landscape', function() {
      ISLANDSCAPE({
        width: 100,
        height: 200
      }).should.eql(false);
      return ISLANDSCAPE({
        width: 200,
        height: 100
      }).should.eql(true);
    });
  });

  describe('ISMOBILE', function() {
    return it('returns a boolean indicating whether the current device is the mobile app', function() {
      CONFIGURE({
        platform: 'iOS'
      });
      ISMOBILE().should.be["true"]();
      CONFIGURE({
        platform: 'Android'
      });
      ISMOBILE().should.be["true"]();
      CONFIGURE({
        platform: 'Mac OS'
      });
      ISMOBILE().should.be["false"]();
      CONFIGURE({
        platform: null
      });
      return ISMOBILE().should.be["false"]();
    });
  });

  describe('ISNEW', function() {
    return it('returns a boolean indicating whether the feature is new or an update', function() {
      CONFIGURE({
        featureIsNew: true
      });
      ISNEW().should.be["true"]();
      ISUPDATE().should.be["false"]();
      CONFIGURE({
        featureIsNew: false
      });
      ISNEW().should.be["false"]();
      ISUPDATE().should.be["true"]();
      CONFIGURE({
        featureIsNew: void 0
      });
      ISNEW().should.be["false"]();
      return ISUPDATE().should.be["true"]();
    });
  });

  describe('ISPORTRAIT', function() {
    return it('is checks whether the media is portrait', function() {
      ISPORTRAIT({
        width: 100,
        height: 200
      }).should.eql(true);
      return ISPORTRAIT({
        width: 200,
        height: 100
      }).should.eql(false);
    });
  });

  if (!DIST) {
    describe('Values', function() {
      it('should create choice values', function() {
        var makeValue;
        makeValue = Utils.converters.ChoiceField;
        makeValue('test').should.eql({
          choice_values: ['test'],
          other_values: []
        });
        makeValue(1).should.eql({
          choice_values: ['1'],
          other_values: []
        });
        makeValue(['a', 'b', 'c']).should.eql({
          choice_values: ['a', 'b', 'c'],
          other_values: []
        });
        makeValue({
          choice_values: ['a']
        }).should.eql({
          choice_values: ['a'],
          other_values: []
        });
        shouldBeNull(makeValue({
          bogus: ['a']
        }));
        shouldBeNull(makeValue({}));
        shouldBeNull(makeValue(null));
        shouldBeNull(makeValue(void 0));
        shouldBeNull(makeValue(new Date));
        return shouldBeNull(makeValue(''));
      });
      it('should create classification values', function() {
        var makeValue;
        makeValue = Utils.converters.ClassificationField;
        makeValue('test').should.eql({
          choice_values: ['test'],
          other_values: []
        });
        makeValue(1).should.eql({
          choice_values: ['1'],
          other_values: []
        });
        makeValue(['a', 'b', 'c']).should.eql({
          choice_values: ['a', 'b', 'c'],
          other_values: []
        });
        makeValue({
          choice_values: ['a']
        }).should.eql({
          choice_values: ['a'],
          other_values: []
        });
        shouldBeNull(makeValue({
          bogus: ['a']
        }));
        shouldBeNull(makeValue({}));
        shouldBeNull(makeValue(null));
        shouldBeNull(makeValue(void 0));
        shouldBeNull(makeValue(new Date));
        return shouldBeNull(makeValue(''));
      });
      it('should create date values', function() {
        var makeValue;
        makeValue = Utils.converters.DateTimeField;
        makeValue('2015-01-01').should.eql('2015-01-01');
        makeValue('2015-12-31').should.eql('2015-12-31');
        makeValue('2015/12/31').should.eql('2015-12-31');
        makeValue(new Date('01/01/2015')).should.eql('2015-01-01');
        shouldBeNull(makeValue({
          bogus: ['a']
        }));
        shouldBeNull(makeValue({}));
        shouldBeNull(makeValue(null));
        shouldBeNull(makeValue(void 0));
        return shouldBeNull(makeValue(''));
      });
      it('should create time values', function() {
        var makeValue;
        makeValue = Utils.converters.TimeField;
        makeValue('12:30').should.eql('12:30');
        makeValue('23:00').should.eql('23:00');
        makeValue('00:00').should.eql('00:00');
        makeValue('01:01').should.eql('01:01');
        shouldBeNull(makeValue('25:61'));
        shouldBeNull(makeValue('2:30'));
        shouldBeNull(makeValue('a'));
        shouldBeNull(makeValue({
          bogus: ['a']
        }));
        shouldBeNull(makeValue({}));
        shouldBeNull(makeValue(null));
        shouldBeNull(makeValue(void 0));
        return shouldBeNull(makeValue(''));
      });
      it('should create address values', function() {
        var addressWith, makeValue;
        makeValue = Utils.converters.AddressField;
        addressWith = function(parts) {
          var address;
          address = {
            sub_thoroughfare: null,
            thoroughfare: null,
            suite: null,
            locality: null,
            sub_admin_area: null,
            admin_area: null,
            postal_code: null,
            country: null
          };
          return _.extend(address, parts);
        };
        makeValue({
          admin_area: 'FL'
        }).should.eql(addressWith({
          admin_area: 'FL'
        }));
        makeValue({
          suite: 200
        }).should.eql(addressWith({
          suite: '200'
        }));
        makeValue({
          suite: true
        }).should.eql(addressWith({
          suite: 'true'
        }));
        makeValue({
          suite: void 0
        }).should.eql(addressWith({
          suite: null
        }));
        makeValue({
          suite: 0/0
        }).should.eql(addressWith({
          suite: 'NaN'
        }));
        makeValue({
          suite: {}
        }).should.eql(addressWith({
          suite: '[object Object]'
        }));
        makeValue({
          suite: []
        }).should.eql(addressWith({
          suite: ''
        }));
        makeValue({
          suite: [1]
        }).should.eql(addressWith({
          suite: '1'
        }));
        makeValue({
          suite: ['1']
        }).should.eql(addressWith({
          suite: '1'
        }));
        makeValue({
          bogus: 'something'
        }).should.eql(addressWith());
        makeValue({}).should.eql(addressWith());
        shouldBeNull(makeValue('25:61'));
        shouldBeNull(makeValue('2:30'));
        shouldBeNull(makeValue('a'));
        shouldBeNull(makeValue(null));
        shouldBeNull(makeValue(void 0));
        return shouldBeNull(makeValue(''));
      });
      return it('should not create values for unsupported field types', function() {
        var field, fields, i, len, results;
        fields = ['PhotoField', 'VideoField', 'AudioField', 'SignatureField', 'RecordLinkField', 'Repeatable', 'Section', 'Label'];
        results = [];
        for (i = 0, len = fields.length; i < len; i++) {
          field = fields[i];
          results.push(shouldBeNull(Utils.makeValue({
            type: field
          }, 'test')));
        }
        return results;
      });
    });
  }

  describe("SETCHOICEFILTER", function() {
    it('accepts an array of objects and converts them to strings', function() {
      SETCHOICEFILTER('choice_field', [1]);
      return runtime.results[0].value.should.eql('["1"]');
    });
    it('removes falsey values from the collection passed in', function() {
      SETCHOICEFILTER('choice_field', [1, null]);
      return runtime.results[0].value.should.eql('["1"]');
    });
    it('accepts a bare nonnull object and converts it to an array of strings with one item', function() {
      SETCHOICEFILTER('choice_field', 1);
      return runtime.results[0].value.should.eql('["1"]');
    });
    return it('accepts null and does not return an array', function() {
      SETCHOICEFILTER('choice_field', null);
      return shouldBeNull(runtime.results[0].value);
    });
  });

  describe("SETMODE", function() {
    it('sets the mode of the editor to view', function() {
      SETMODE('view');
      return MODE().should.eql('view');
    });
    return it('sets the mode of the editor to edit', function() {
      SETMODE('edit');
      return MODE().should.eql('edit');
    });
  });

  describe('INFERENCE', function() {
    it('calls inference', function() {
      var params;
      params = {
        photo_id: 'photo-id',
        model: 'test.ort',
        size: 640,
        format: 'chw',
        type: 'float'
      };
      mockHostFunction('setTimeout', []);
      mockHostFunction('inference', [
        null, {
          outputs: [1, 2, 3]
        }
      ]);
      return INFERENCE(params, function(error, arg) {
        var outputs;
        outputs = arg.outputs;
        return outputs.should.eql([1, 2, 3]);
      });
    });
    it('fails if called without a photo', function() {
      var params;
      params = {
        model: 'test.ort',
        size: 640,
        format: 'chw',
        type: 'float'
      };
      return (function() {
        return INFERENCE(params);
      }).should["throw"]('options.photo_id must be a string');
    });
    it('fails if called without a size', function() {
      var params;
      params = {
        photo_id: 'photo-id',
        model: 'test.ort',
        format: 'chw',
        type: 'float'
      };
      return (function() {
        return INFERENCE(params);
      }).should["throw"]('options.size must be a number');
    });
    describe('LOADFILE', function() {
      it('calls loadFile', function() {
        var params;
        params = {
          name: 'test.txt'
        };
        mockHostFunction('loadFile', [null, 'test']);
        return LOADFILE(params, function(error, result) {
          return result.should.eql('test');
        });
      });
      it('calls loadFile with parsed json', function() {
        var params;
        params = {
          name: 'test.json'
        };
        mockHostFunction('loadFile', [null, '{"hello":"world"}']);
        return LOADFILE(params, function(error, result) {
          return result.hello.should.eql('world');
        });
      });
      it('calls loadFile with loaded js', function() {
        var params;
        params = {
          name: 'test.js'
        };
        mockHostFunction('loadFile', [null, 'module.exports = { hello: "world" }']);
        return LOADFILE(params, function(error, result) {
          return result.hello.should.eql('world');
        });
      });
      return it('fails without a file name', function() {
        mockHostFunction('loadFile', [null, 'test']);
        return (function() {
          return LOADFILE({});
        }).should["throw"]('options.name must be a string');
      });
    });
    describe('LOADRECORDS', function() {
      return it('calls loadRecords', function() {
        var params;
        params = {
          form_id: 'form-id'
        };
        mockHostFunction('loadRecords', [
          null, {
            records: [
              {
                id: 'test1'
              }, {
                id: 'test2'
              }
            ]
          }
        ]);
        return LOADRECORDS(params, function(error, arg) {
          var records;
          records = arg.records;
          return records.length.should.eql(2);
        });
      });
    });
    describe('LOADFORM', function() {
      return it('calls loadForm', function() {
        var params;
        params = {
          id: 'form-id'
        };
        mockHostFunction('loadForm', [
          null, {
            form: {
              id: 'test1'
            }
          }
        ]);
        return LOADFORM(params, function(error, arg) {
          var form;
          form = arg.form;
          return form.id.should.eql('test1');
        });
      });
    });
    return describe('RECOGNIZETEXT', function() {
      return it('calls recognizeText', function() {
        var params;
        params = {
          photo_id: 'photo-id'
        };
        mockHostFunction('recognizeText', [
          null, {
            text: 'hello'
          }
        ]);
        return RECOGNIZETEXT(params, function(error, arg) {
          var text;
          text = arg.text;
          return text.should.eql('hello');
        });
      });
    });
  });

}).call(this);
