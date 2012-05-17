REPORTER = dot


test: test-bdd

test-bdd: 
	cat test/dao/userDAO.test.js $(shell find test/dao/userDAO -name "*.userDAO.test.js" -type f) test/end.test.js > test/gen/userDAO.gen.js
	cat test/server/dataRouter.test.js $(shell find test/server/dataRouter -name "*.dataRouter.test.js" -type f) test/end.test.js > test/gen/dataRouter.gen.js
	cp test/routes/*.js test/gen
	cp test/rest/*.js test/gen
	mocha --reporter $(REPORTER) --ui bdd -r should -r listlyTest $(shell find test/gen -name "*.js" -type f | sort)