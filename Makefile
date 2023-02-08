types:
	asdf exec yarn && asdf exec yarn run \
		dts-generator \
									--project ./ts \
									--target 0 \
									--exclude **/src/host/** \
									--exclude **/src/runtime/** \
									--exclude **/src/test/** \
									--exclude **/src/util/** \
									--exclude **/__tests__/** \
									--exclude **/node_modules/** \
									--exclude **/editor/** \
									--exclude src/functions/index.ts \
									--exclude src/types/globals.d.ts \
									--exclude src/types/node_modules.d.ts \
									--out dist/js-api.raw.d.ts \
		&& asdf exec ruby script/build.rb
