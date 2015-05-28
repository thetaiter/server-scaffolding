'use strict';

module.exports = {
    setUp: function (callback) {
        this.test_str = 'test string';
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    my_tes1: function (test) {
        test.equals(this.test_str, 'test string');
        test.done();
    }
};
