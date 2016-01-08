REPORTER  ?= list
TESTS     ?= test/*.coffee

all: build

build:
	mkdir -p dist
	./node_modules/browserify/bin/cmd.js -t coffeeify --extension=".coffee" runtime.coffee | \
		./node_modules/uglify-js/bin/uglifyjs > dist/expressions.js --mangle
	./script/build-docs

debug:
	mkdir -p dist
	./node_modules/browserify/bin/cmd.js -t coffeeify --extension=".coffee" runtime.coffee > dist/expressions.js
	./script/build-docs

docs:
	./script/build-docs

help:
	mkdir -p docs/output/help
	mkdir -p docs/output/help/expressions/reference
	mkdir -p docs/output/help/events/reference
	./node_modules/coffee-script/bin/coffee script/generate-help.coffee

copy:
	./node_modules/coffee-script/bin/coffee script/copy-files.coffee

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
