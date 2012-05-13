REPORTER = dot
TESTS = $(shell find test -name "*.js" -type f | sort)

test: test-bdd

test-bdd: 
	mocha --reporter $(REPORTER) --ui bdd -r should -r jsmockito -r jshamcrest -r listlyTest $(TESTS)