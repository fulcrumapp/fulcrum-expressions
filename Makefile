REPORTER  ?= list
TESTS     ?= test/*.coffee

all: build

build:
	browserify -t coffeeify --extension=".coffee" runtime.coffee > dist/expressions.js

test:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--require should \
	--compilers coffee:coffee-script/register \
	$(TESTS)

.PHONY: build test
