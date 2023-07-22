lint:
	npx eslint .

test:
	npm test

test-watch:
	npm test -- --watch

install:
	npm ci

test-coverage:
	npm test -- --coverage --coverageProvider=v8

gendiff:
	node gendiff.js

publish:
	npm publish --dry-run