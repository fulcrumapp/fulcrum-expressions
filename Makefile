types:
	asdf exec yarn && asdf exec yarn run \
		dts-generator \
									--project ./ts \
									--target 0 \
									--exclude **/ts/host/** \
									--exclude **/ts/runtime/** \
									--exclude **/ts/test/** \
									--exclude **/ts/util/** \
									--exclude **/__tests__/** \
									--exclude **/node_modules/** \
									--exclude **/ts/** \
									--exclude ts/functions/index.ts \
									--exclude ts/types/globals.d.ts \
									--exclude ts/types/node_modules.d.ts \
									--out dist/js-api.raw.d.ts \
		&& asdf exec ruby script/build.rb
