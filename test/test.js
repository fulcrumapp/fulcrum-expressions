global.Intl = require('intl');

const _ = require('underscore');
const path = require('path');
const CSON = require('season');

const DIST = process.env.DIST || false;

let runtime, Utils;

if (DIST) {
  console.log('Running distribution');
  require('../dist/expressions.js');
  runtime = global.$$runtime;
} else {
  console.log('Running debug');
  runtime = require('../runtime');
  Utils = require('../utils');
}

const variables = CSON.readFileSync(path.join(__dirname, 'variables.cson'));

global.CONFIGURE(variables);

function resetConfig() {
  global.RESETCONFIG();
  runtime.values = variables.values.form_values;
  runtime.setupValues();
  runtime.resetResults();
  global.CONFIGURE(variables);
}

runtime.form = variables.form;
runtime.values = variables.values.form_values;
runtime.prepare();

function mockHostFunction(name, values) {
  runtime[`$$${name}`] = function() {
    runtime.callbackID = arguments[arguments.length - 1];
    runtime.callbackArguments = values;
    runtime.finishAsync();
  };
}

function shouldBeNull(value) {
  (value === null).should.be.true();
}

function shouldHaveNoValue(value) {
  (value === global.NO_VALUE).should.be.true();
}

function shouldBeUndefined(value) {
  (value === undefined).should.be.true();
}

beforeEach(function() {
  resetConfig();
});

describe('ARRAY', function() {
  it('returns an array from the arguments', function() {
    global.ARRAY().should.eql([]);
    global.ARRAY(1, 2, 3, 4).should.eql([1, 2, 3, 4]);
    global.ARRAY([1, 2], [3, 4]).should.eql([1, 2, 3, 4]);
    global.ARRAY([1, 2], [3, 4], [5, 6]).should.eql([1, 2, 3, 4, 5, 6]);
    global.ARRAY([1, 2], [3, 4], [5, [6, [7, 8]]]).should.eql([1, 2, 3, 4, 5, 6, 7, 8]);
    global.ARRAY(undefined, null).should.eql([undefined, null]);
    global.ARRAY(NaN, NaN).should.eql([NaN, NaN]);
    global.ARRAY(1, 2, 3).should.eql([1, 2, 3]);
    global.ARRAY(1, '2', 3).should.eql([1, '2', 3]);
    global.ARRAY({}, '2', 'a7').should.eql([{}, '2', 'a7']);
    global.ARRAY([], [], []).should.eql([]);
    global.ARRAY([]).should.eql([]);
    global.ARRAY(undefined).should.eql([undefined]);
    global.ARRAY(undefined, undefined).should.eql([undefined, undefined]);
    global.ARRAY(global.ARRAY([], [], [])).should.eql([]);
    global.ARRAY(global.ARRAY([], global.ARRAY([]), [], global.ARRAY())).should.eql([]);
    global.ARRAY(global.ARRAY(global.ARRAY(global.ARRAY([1, 2], [3, 4])))).should.eql([1, 2, 3, 4]);
  });
});

describe('NUMS', function() {
  it('returns an array of numbers from the arguments', function() {
    global.NUMS(1, 2, 3).should.eql([1, 2, 3]);
    global.NUMS(1, '2', 3).should.eql([1, 2, 3]);
    global.NUMS(1, '2', 'a7').should.eql([1, 2, NaN]);
    global.NUMS({}, '2', 'a7').should.eql([NaN, 2, NaN]);
  });
});

describe('NUM', function() {
  it('converts the input to a number', function() {
    global.NUM(1).should.be.exactly(1);
    global.NUM(-1).should.be.exactly(-1);
    global.NUM('1').should.be.exactly(1);
    global.NUM({}).should.be.NaN();
    global.NUM().should.be.NaN();
    global.NUM([]).should.be.NaN();
    global.NUM('test').should.be.NaN();
  });
});

describe('ISNAN', function() {
  it('tests whether the input is not a number', function() {
    global.ISNAN(1).should.be.false();
    global.ISNAN('1').should.be.false();
    global.ISNAN('a7').should.be.true();
    global.ISNAN({}).should.be.true();
  });
});

describe('PRECISION', function() {
  it('returns the precision of a number', function() {
    global.PRECISION(1.11).should.be.exactly(2);
    global.PRECISION('1').should.be.exactly(0);
    global.PRECISION('aaa').should.be.NaN();
  });
});