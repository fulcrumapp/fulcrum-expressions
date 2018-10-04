REPORTER  ?= list
TESTS     ?= test/*.coffee

define docker_run
	docker run -v `pwd`:/app:cached -it spatialnetworks/alpine bash -l -c "${1}"
endef

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

docs: build-docs generate-help copy

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

jest:
	$(call docker_run, yarn && NODE_ICU_DATA=./node_modules/full-icu yarn jest --watch)

coverage:
	$(call docker_run, yarn && NODE_ICU_DATA=./node_modules/full-icu yarn jest --coverage)

tsdoc:
	$(call docker_run, yarn && yarn typedoc --theme minimal --out doc --exclude **/*.test.ts)

repl:
	$(call docker_run, make build && ./console)

test:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--require should \
	--compilers coffee:coffee-script/register \
	$(TESTS)

.PHONY: build debug test docs generate-help copy clean dist
