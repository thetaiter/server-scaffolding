'use strict';

module.exports = {
    setUp: function(callback) {
        this.test_str = 'test string';
        callback();
    },
    tearDown: function(callback) {
        // clean up
        callback();
    },
    'Test 1': function(test) {
        test.expect(1);
        test.equals(this.test_str, 'test string');
        test.done();
    },
    'Another Test': function(test) {
        test.expect(1);
        test.ok(true, 'This test will pass');
        test.done();
    }
};
