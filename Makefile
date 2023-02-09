types:
	asdf exec yarn && asdf exec yarn run \
		dts-generator \
									--project ./ts \
									--target 0 \
									--exclude host/** \
									--exclude runtime/** \
									--exclude test/**/*.ts \
									--exclude util/** \
									--exclude **/__tests__/** \
									--exclude **/node_modules/** \
									--exclude **/dist/** \
									--exclude test/helpers.ts \
									--exclude functions/index.ts \
									--exclude types/globals.d.ts \
									--exclude types/node_modules.d.ts \
									--out dist/js-api.raw.d.ts \
		&& asdf exec ruby script/build.rb
