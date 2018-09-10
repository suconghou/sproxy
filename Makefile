build:
	cd src && \
	rollup index.js -o ../bundle.js -f cjs -e net,fs,os,process && \
	uglifyjs ../bundle.js -o ../bundle.js -c toplevel,collapse_vars=true,reduce_vars=true -m && \
	cd .. && \
	echo '#!/usr/bin/env node' | cat - bundle.js > sproxy && chmod +x sproxy

dev:
	cd src && \
	rollup index.js -o ../bundle.js -f cjs -e net,fs,os,process  -w
docker:
	docker build -t=suconghou/tools:sproxy .