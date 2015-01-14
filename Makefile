REPORTER  ?= list
TESTS     ?= test/*.coffee

all: build

build:
	browserify -t coffeeify --extension=".coffee" runtime.coffee | \
		./node_modules/uglify-js/bin/uglifyjs > dist/expressions.js --compress --mangle
	./script/build-docs

docs:
	./script/build-docs

help:
	./script/generate-help

copy:
	./script/copy-files

dist: clean build help test

clean:
	rm dist/*
	rm docs/output/*

test:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--require should \
	--compilers coffee:coffee-script/register \
	$(TESTS)

.PHONY: build test docs help copy clean dist
