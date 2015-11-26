REPORTER  ?= list
TESTS     ?= test/*.coffee

all: build

build:
	mkdir -p dist
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
	mkdir -p docs/output/help/reference
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
