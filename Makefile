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

docs: build-docs generate-help

build-docs:
	./script/build-docs

generate-help:
	mkdir -p docs/output/help
	mkdir -p docs/output/help/expressions/reference
	mkdir -p docs/output/help/events/reference
	./node_modules/coffee-script/bin/coffee script/generate-help.coffee

copy:
	./node_modules/coffee-script/bin/coffee script/copy-files.coffee

dist: clean build generate-help test

clean:
	rm -f dist/*
	rm -rf docs/output/*

test:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--require should \
	--require coffee-coverage/register-istanbul \
	--require coffee-script/register \
	$(TESTS)
	./node_modules/.bin/istanbul report

.PHONY: build debug test docs generate-help copy clean dist
