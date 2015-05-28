module.exports = {
    setUp: function (callback) {
        this.test_str = 'test string';
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    test1: function (test) {
        test.equals(this.test_str, 'test string');
        test.done();
    }
};
