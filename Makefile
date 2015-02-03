REPORTER  ?= list
TESTS     ?= test/*.coffee

all: build

build:
	mkdir -p dist
	# Note: DO NOT pass --compress to uglifyjs. The Rhino JS interpreter on Android
	# does not work well with the transformations it applies to the code. It results
	# in a more complex (or, different) AST which results in StackOverflowError's while
	# parsing the source.
	browserify -t coffeeify --extension=".coffee" runtime.coffee | \
		./node_modules/uglify-js/bin/uglifyjs > dist/expressions.js --mangle
	./script/build-docs

debug:
	mkdir -p dist
	browserify -t coffeeify --extension=".coffee" runtime.coffee > dist/expressions.js
	./script/build-docs

docs:
	./script/build-docs

help:
	mkdir -p docs/output/help
	./script/generate-help

copy:
	./script/copy-files

dist: clean build help test

clean:
	rm -f dist/*
	rm -rf docs/output/*

test:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--require should \
	--compilers coffee:coffee-script/register \
	$(TESTS)

.PHONY: build debug test docs help copy clean dist
