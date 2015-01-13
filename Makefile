REPORTER  ?= list
TESTS     ?= test/*.coffee

all: build

build:
	browserify -t coffeeify --extension=".coffee" runtime.coffee | \
		./node_modules/uglify-js/bin/uglifyjs > dist/expressions.js --compress --mangle
	./script/build-docs

docs:
	./script/build-docs

copy:
	./script/copy-files

dist: build copy

test:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--require should \
	--compilers coffee:coffee-script/register \
	$(TESTS)

.PHONY: build test docs copy dist
