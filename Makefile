
# use this so we can run NVM for tests
NVM = [[ -s $$HOME/.nvm/nvm.sh ]] && . $$HOME/.nvm/nvm.sh

help:
	@echo "Development actions:"
	@echo "--------------------"
	@echo "clean:            Cleans up everything"
	@echo "install:          Installs all of the packages"
	@echo "lint:             Runs the linter"
	@echo "test:             Runs all of the tests"
	@echo "run:              Runs the development server locally"
	@echo "build:            Builds the dist folder using webpack"

clean: clean-node
	@echo "Run npm install to get started"

clean-node:
	# remove node files
	rm -rf node_modules/

install: clean
	@echo "Installing all of the packages needed"
	npm install

lint:
	npm run lint

# What node versions do we want to have support for
NODE_TARGETS = 14

$(NODE_TARGETS):
	@echo "Testing Node $@"
	@$(NVM) && nvm use $@ && npm run test

test: $(NODE_TARGETS)

test-ci:
	npm run test

run: build
	./node_modules/.bin/serve

build:
	./node_modules/.bin/webpack
