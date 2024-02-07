# Mocha-chai-testing

# info

describe = suite
it = test
integration testing = involves API
unit testing = focuses on testing individual units/functions
i can do describe.only || it.only , to test only one test / suite
i can do describe.skip || it.skip , to skip one test / suite

# Hooks

describe('hooks', function () {
before(function () {
runs once before the first test in this block
});

after(function () {
runs once after the last test in this block
});

beforeEach(function () {
runs before each test in this block
});

afterEach(function () {
runs after each test in this block
});

    test cases

});

# examples

import Todo from ...

This cleans up the data once before i start all the tests
before((done) => {
Todo.deleteMany({})
.then(() => done()) Call done() after successful deletion
.catch((err) => done(err)); Call done(err) if there's an error
});

This cleans up the data once after all tests are finished
after((done) => {
Todo.deleteMany({})
.then(() => done()) Call done() after successful deletion
.catch((err) => done(err)); Call done(err) if there's an error
});
