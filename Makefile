types:
	rm -f ts/api.ts && asdf exec yarn && asdf exec yarn run \
		dts-generator \
									--project ./ts \
									--target 0 \
									--exclude host/**/* \
									--exclude runtime/**/* \
									--exclude test/**/* \
									--exclude util/**/* \
									--exclude **/__tests__/** \
									--exclude **/node_modules/** \
									--exclude **/dist/** \
									--exclude ts/api.ts \
									--exclude functions/index.ts \
									--exclude types/globals.d.ts \
									--exclude types/node_modules.d.ts \
									--out dist/api.raw.d.ts \
		&& asdf exec ruby script/build.rb
